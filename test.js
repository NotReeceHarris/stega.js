const pixelAES = require('./index.js');

(async () => {
    const filename = 'encode.png'
    const originalText = 'Hello World!';

    const keys = {
        key: '5bb2ee6d01196b2523bf4659582dd98c60cc1fbf99b891c2cc2a01ff50761f83',
        iv: '7f68712c1ad4727f4c503b14673b5c99'
    }

    const encrypted = pixelAES.encrypt(originalText, keys.key, keys.iv)

    await pixelAES.encode(encrypted, filename)

    const decoded = await pixelAES.decode(filename)
    const decrypted = pixelAES.decrypt(decoded, keys.key, keys.iv)

    console.log('Decrypted successfully:', originalText === decrypted);
})()
