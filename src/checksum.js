const fs = require('fs');
const crypto = require('crypto');

function calculateChecksum(filePath, algorithm = 'md5') {
    return new Promise((resolve, reject) => {
        const hash = crypto.createHash(algorithm);
        const stream = fs.createReadStream(filePath);

        stream.on('data', (data) => {
            hash.update(data);
        });

        stream.on('end', () => {
            const checksum = hash.digest('hex');
            resolve(checksum);
        });

        stream.on('error', (error) => {
            reject(error);
        });
    });
}

(async () => {
    console.log(`\nInput     : ${await calculateChecksum('./readme/image.jpg')}\nFormatted : ${await calculateChecksum('./readme/formatted.image.png')}\nEncoded   : ${await calculateChecksum('./readme/encoded.image.png')}\n`)
})()