const pixelAES = require('./index.js');

(async () => {
    const filename = 'encode.png'
    const originalText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas pharetra. Purus in mollis nunc sed id semper risus. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Tellus elementum sagittis vitae et leo duis ut. Augue eget arcu dictum varius duis at consectetur lorem. Nunc sed blandit libero volutpat sed cras. In nibh mauris cursus mattis. Nunc mattis enim ut tellus elementum sagittis vitae et. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Semper auctor neque vitae tempus quam pellentesque nec nam. Eu turpis egestas pretium aenean pharetra. At imperdiet dui accumsan sit. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. In cursus turpis massa tincidunt dui ut ornare.';

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
