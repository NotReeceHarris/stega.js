const crypto = require('crypto');

function getRandomNumber(min, max) {
    if (min >= max) {
        throw new Error('Invalid range: min must be less than max');
    }

    const range = max - min + 1;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);

    if (bytesNeeded > 6) {
        throw new Error('Invalid range: too large');
    }

    const maxValidValue = 256 ** bytesNeeded - 1;
    const buffer = Buffer.allocUnsafe(bytesNeeded);
    let randomValue;

    do {
        crypto.randomFillSync(buffer);
        randomValue = buffer.readUIntBE(0, bytesNeeded);
    } while (randomValue > maxValidValue - (maxValidValue % range));

    return min + (randomValue % range);
}

function getSeedableRandomNumber(seed, max) {
    const hmac = crypto.createHmac('sha256', seed);
    hmac.update('random-data');

    const randomBytes = Buffer.from(hmac.digest('hex'), 'hex');
    const randomNumber = randomBytes.readUInt32BE(0) % (max + 1);
    
    return randomNumber;
}

const keys = () => {
    return {
        key: crypto.randomBytes(32).toString('hex'),
        nonce: crypto.randomBytes(12).toString('hex')
    }
}

const encrypt = (text, key, iv) => {
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));

    const obfArray = [
        crypto.randomBytes(getRandomNumber(0, text.length)),
        crypto.randomBytes(getRandomNumber(0, text.length)),
        crypto.randomBytes(getRandomNumber(0, text.length)),
        crypto.randomBytes(getRandomNumber(0, text.length)),
        crypto.randomBytes(getRandomNumber(0, text.length)),
        crypto.randomBytes(getRandomNumber(0, text.length))
    ]

    obfArray[getSeedableRandomNumber(iv, 4)] = Buffer.from(text, 'ascii')

    let encrypted = cipher.update(JSON.stringify(obfArray));
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    
    return [encrypted.toString('hex'), cipher.getAuthTag().toString('hex')];
}

const decrypt = (text, key, iv, tag) => {
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    decipher.setAuthTag(Buffer.from(tag, 'hex'));

    let decrypted = decipher.update(Buffer.from(text, 'hex'));
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return Buffer.from(JSON.parse(decrypted)[getSeedableRandomNumber(iv, 4)].data).toString('ascii');
}

module.exports = {encrypt, decrypt, keys}