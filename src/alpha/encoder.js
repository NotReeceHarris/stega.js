const fs = require('fs');
const sharp = require('sharp');
const PNG = require('pngjs').PNG;

const AES = require('./encryption.js');

const map = {
    '0': '254',
    '1': '253',
    '2': '252',
    '3': '251',
    '4': '250',
    '5': '249',
    '6': '248',
    '7': '247',
    '8': '246',
    '9': '245',
    'a': '244',
    'b': '243',
    'c': '242',
    'd': '241',
    'e': '240',
    'f': '239',
    'undefined': '255',
    '254': '0',
    '253': '1',
    '252': '2',
    '251': '3',
    '250': '4',
    '249': '5',
    '248': '6',
    '247': '7',
    '246': '8',
    '245': '9',
    '244': 'a',
    '243': 'b',
    '242': 'c',
    '241': 'd',
    '240': 'e',
    '239': 'f',
    '255': '',
}

function processImage(inputFilePath, outputFilePath) {
    return new Promise((res) => {
        fs.createReadStream(inputFilePath)
            .pipe(new PNG())
            .on('parsed', function() {
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        const idx = (this.width * y + x) << 2;
                        this.data[idx + 3] = 255;
                    }
                }
                this.pack().pipe(fs.createWriteStream(outputFilePath))
            })
            .on('close', () => {
                res()
                return;
            });
    })
}

function convertToPNG(inputFilePath, outputFilePath) {
    return new Promise((res,rej) => {
        sharp(inputFilePath)
        .toFormat('png')
        .toFile(outputFilePath, (err, info) => {
            if (err) {
                rej(err)
            } else {
                res(info)
            }
    });
    })
}

function size(ifn) {
    return new Promise((res) => {
        fs.createReadStream(ifn)
            .pipe(new PNG())
            .on('parsed', function() {
                res(this.width * this.height)
            })
    })
}

const format = (input, output) => {
    return new Promise(async (res) => {
        await convertToPNG(input, output)
        processImage(output, output).then(() => {
            res()
            return;
        })
    })
}

const encode = async (text, ifn, ofn, keys) => {

    if (!Buffer.isBuffer(text)) {
        throw new Error('Input data must be a buffer');
    }

    const encryptedArray = AES.encrypt(text.toString('hex'), keys.key, keys.nonce)
    const encrypted = encryptedArray[0]

    keys.tag = encryptedArray[1]

    if (await size(ifn) < encrypted.length) {
        throw new Error('Image is to small')
    }

    return new Promise((res) => {
        fs.createReadStream(ifn)
            .pipe(new PNG())
            .on('parsed', function() {
                let count = 0
                let br = false;
                for (let y = 0; y < this.height && !br; y++) {
                    for (let x = 0; x < this.width && !br; x++) {
                        const idx = (this.width * y + x) << 2;
                        this.data[idx + 3] = map[encrypted.split('').length >= count ? encrypted.split('')[count] : undefined];

                        if (count >= encrypted.length) {
                            br = true
                        } 0

                        count++
                    }
                }
                this.pack().pipe(fs.createWriteStream(ofn))
                res(keys);
            })
            .on('close', () => {  
                res(keys);
            });
    })

}

const decode = async (ifn, keys, tag) => {

    return new Promise((res) => {
        let string = ''

        const readStream = fs.createReadStream(ifn);
        const pngStream = readStream.pipe(new PNG());

        pngStream.on('parsed', function() {
                ucount = 0
                for (let y = 0; y < this.height; y++) {
                    for (let x = 0; x < this.width; x++) {
                        const idx = (this.width * y + x) << 2;

                        string += map[this.data[idx + 3]]
                        if (this.data[idx + 3]===255) ucount++;

                        if (ucount >= 200) {
                            readStream.destroy();
                            res(Buffer.from(AES.decrypt(Buffer.from(string, 'hex'), keys.key, keys.nonce, tag), 'hex'));
                            return;
                        };
                    }
                }
            })
            .on('close', () => {
                res(Buffer.from(AES.decrypt(Buffer.from(string, 'hex'), keys.key, keys.nonce, tag), 'hex'));
            });
    })

}

module.exports = {format, encode, decode}
