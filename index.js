// TODO : 2 LAYER OBFUSCATION

const crypto = require('crypto');
const fs = require('fs');
const { createCanvas } = require('canvas');

const maps = [{
    '0': '#FFFFFF',
    '1': '#FEFFFF',
    '2': '#FEFEFF',
    '3': '#FEFEFE',
    '4': '#FFFEFE',
    '5': '#FFFFFE',
    '6': '#FFFEFF',
    '7': '#FFFEFD',
    '8': '#FFFDFD',
    '9': '#FFFDFE',
    'a': '#FDFEFF',
    'b': '#FEFDFF',
    'c': '#FEFDFD',
    'd': '#FDFEFD',
    'e': '#FFFDFF',
    'f': '#FFFFFD',
    'undefined': '#FDFFFD',
    '#FFFFFF': '0',
    '#FEFFFF': '1',
    '#FEFEFF': '2',
    '#FEFEFE': '3',
    '#FFFEFE': '4',
    '#FFFFFE': '5',
    '#FFFEFF': '6',
    '#FFFEFD': '7',
    '#FFFDFD': '8',
    '#FFFDFE': '9',
    '#FDFEFF': 'a',
    '#FEFDFF': 'b',
    '#FEFDFD': 'c',
    '#FDFEFD': 'd',
    '#FFFDFF': 'e',
    '#FFFFFD': 'f',
    '#FDFFFD': ''
}, {
    '0': '#42eaa7',
    '1': '#2a72c3',
    '2': '#df3a8f',
    '3': '#087ff5',
    '4': '#f041cd',
    '5': '#ea294f',
    '6': '#f4ba18',
    '7': '#2ebfa3',
    '8': '#fbc2e3',
    '9': '#a300b4',
    'a': '#0dc8d0',
    'b': '#9fb15f',
    'c': '#e1584c',
    'd': '#c28ade',
    'e': '#e6f5a2',
    'f': '#44b409',
    'undefined': '#81cad6',
    '#42eaa7': '0',
    '#2a72c3': '1',
    '#df3a8f': '2',
    '#087ff5': '3',
    '#f041cd': '4',
    '#ea294f': '5',
    '#f4ba18': '6',
    '#2ebfa3': '7',
    '#fbc2e3': '8',
    '#a300b4': '9',
    '#0dc8d0': 'a',
    '#9fb15f': 'b',
    '#e1584c': 'c',
    '#c28ade': 'd',
    '#e6f5a2': 'e',
    '#44b409': 'f',
    '#81cad6': ''
}]

function convertKeysToLowercase(obj) {
    const result = {};
  
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const lowercaseKey = key.toLowerCase();
            result[lowercaseKey] = obj[key];
        }
    }
  
    return result;
}
  
const map = convertKeysToLowercase(maps[0])

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
    const hash = hmac.digest('hex');
    
    const randomBytes = Buffer.from(hash, 'hex');
    const randomNumber = randomBytes.readUInt32BE(0) % (max + 1);
    
    return randomNumber;
  }

const keys = () => {
    return {
        key: crypto.randomBytes(32).toString('hex'),
        iv: crypto.randomBytes(16).toString('hex')
    }
}

const encrypt = (text, key, iv) => {
    const ENCRYPTION_KEY = Buffer.from(key, 'hex'); const IV = Buffer.from(iv, 'hex');
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);

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
    return encrypted.toString('hex');
}

const decrypt = (text, key, iv) => {
    const ENCRYPTION_KEY = Buffer.from(key, 'hex'); const IV = Buffer.from(iv, 'hex');
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return Buffer.from(JSON.parse(decrypted)[getSeedableRandomNumber(iv, 4)].data).toString('ascii');
}

const encode = (data, fn='output.png', v=false, m=map) => {

    return new Promise((res) => {
        const {h, w} = { h: Math.ceil(Math.sqrt(data.length)), w: (data.length % 2 === 1 ? (Math.ceil(Math.sqrt(data.length)))+1 : (Math.ceil(Math.sqrt(data.length)))) }

        const canvas = createCanvas(h, w);
        const context = canvas.getContext('2d');
        let count = 0;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                context.fillStyle = m[String(data.split('')[count]).toLowerCase()];
                context.fillRect(x, y, 1, 1);
                count++
            }
        }

        const stream = fs.createWriteStream(fn);
        canvas.createPNGStream().pipe(stream);

        stream.on('finish', () => {
            if (v) console.log('Encoded successfully!');
            fs.createReadStream(fn)
                .pipe(new (require('pngjs').PNG)())
                .on('parsed', function () {
                    res(this.data);
                })
                .on('error', () => {
                    res(null)
                });
        });
    })

}

const decode = (fn, m=map) => {
    const toHex = (n) => n.toString(16).length === 1 ? '0' + n.toString(16) : n.toString(16);
    return new Promise((res) => {
        fs.createReadStream(fn)
        .pipe(new (require('pngjs').PNG)())
        .on('parsed', function() {
            let string = ''
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const idx = (this.width * y + x) << 2;
                    string += m[`#${toHex(this.data[idx])}${toHex(this.data[idx + 1])}${toHex(this.data[idx + 2])}`.toLowerCase()]
                }
            }
            res(string)
        })
    }).then((data) => {
        return data
    })
    
}

module.exports = {encrypt, decrypt, encode, decode, keys}