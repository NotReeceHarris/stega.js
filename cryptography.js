// TODO : 2 LAYER OBFUSCATION

const crypto = require('crypto');
const fs = require('fs');
const { createCanvas } = require('canvas');

const map = {
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
}

const ENCRYPTION_KEY = Buffer.from('f46c59e608135a02efbf9d8efff6808c6a3493ca79a90e840524bb4930c786a4', 'hex');
const IV = Buffer.from('3db72a620c448028e89b506a46ea8574', 'hex');

function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    const encryptedText = Buffer.from(text, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-cbc', ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function encode(data, fn='output.png') {

    const {h, w} = { h: Math.ceil(Math.sqrt(data.length)), w: (data.length % 2 === 1 ? (Math.ceil(Math.sqrt(data.length)))+1 : (Math.ceil(Math.sqrt(data.length)))) }

    const canvas = createCanvas(h, w);
    const context = canvas.getContext('2d');
    let count = 0;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            context.fillStyle = map[String(data.split('')[count]).toLowerCase()];
            context.fillRect(x, y, 1, 1);
            count++
        }
    }

    const stream = fs.createWriteStream(fn);
    canvas.createPNGStream().pipe(stream);
    stream.on('finish', () => {
        console.log('Encoded successfully!');
    });

}

const decode = async (fn) => {
    const toHex = (n) => n.toString(16).length === 1 ? '0' + n.toString(16) : n.toString(16);
    return new Promise((res) => {
        fs.createReadStream(fn)
        .pipe(new (require('pngjs').PNG)())
        .on('parsed', function() {
            let string = ''
            for (let y = 0; y < this.height; y++) {
                for (let x = 0; x < this.width; x++) {
                    const idx = (this.width * y + x) << 2;
                    string += map[`#${toHex(this.data[idx])}${toHex(this.data[idx + 1])}${toHex(this.data[idx + 2])}`.toUpperCase()]
                }
            }
            res(string)
        })
    }).then((data) => {
        return data
    })
    
}

(async () => {
    const originalText = `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et malesuada fames ac turpis egestas maecenas pharetra. Purus in mollis nunc sed id semper risus. Aenean pharetra magna ac placerat vestibulum lectus mauris ultrices. Tellus elementum sagittis vitae et leo duis ut. Augue eget arcu dictum varius duis at consectetur lorem. Nunc sed blandit libero volutpat sed cras. In nibh mauris cursus mattis. Nunc mattis enim ut tellus elementum sagittis vitae et. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Semper auctor neque vitae tempus quam pellentesque nec nam. Eu turpis egestas pretium aenean pharetra. At imperdiet dui accumsan sit. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. In cursus turpis massa tincidunt dui ut ornare.

        Rutrum quisque non tellus orci. Pretium vulputate sapien nec sagittis aliquam malesuada bibendum. Libero nunc consequat interdum varius sit amet. Elementum nisi quis eleifend quam adipiscing vitae. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Id interdum velit laoreet id donec ultrices tincidunt arcu. A pellentesque sit amet porttitor eget dolor. Justo eget magna fermentum iaculis eu non diam. Pellentesque nec nam aliquam sem. Eget mauris pharetra et ultrices neque ornare aenean.

        Egestas sed sed risus pretium quam vulputate. In fermentum posuere urna nec tincidunt praesent semper feugiat. Ut faucibus pulvinar elementum integer. Eleifend donec pretium vulputate sapien nec sagittis. Etiam dignissim diam quis enim lobortis scelerisque fermentum. Dignissim convallis aenean et tortor. Habitasse platea dictumst quisque sagittis purus. Mi eget mauris pharetra et ultrices neque. Purus gravida quis blandit turpis cursus in hac habitasse platea. Pretium lectus quam id leo. Sed faucibus turpis in eu mi bibendum neque egestas. Cursus metus aliquam eleifend mi in nulla posuere. Eget felis eget nunc lobortis. Molestie a iaculis at erat pellentesque adipiscing commodo elit. Dolor magna eget est lorem ipsum dolor sit. Est ultricies integer quis auctor elit sed vulputate mi. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Et tortor at risus viverra. Sapien faucibus et molestie ac feugiat sed lectus vestibulum. Tristique senectus et netus et malesuada.

        Posuere ac ut consequat semper viverra nam. Arcu odio ut sem nulla pharetra diam sit amet nisl. Eros donec ac odio tempor orci dapibus ultrices in. Nullam non nisi est sit amet facilisis magna etiam. Neque convallis a cras semper auctor. Enim praesent elementum facilisis leo vel. Donec adipiscing tristique risus nec feugiat in fermentum. Vitae nunc sed velit dignissim sodales ut eu sem. Interdum consectetur libero id faucibus. Id nibh tortor id aliquet lectus proin. Sit amet purus gravida quis. Sit amet aliquam id diam maecenas ultricies mi eget mauris. Orci nulla pellentesque dignissim enim sit amet venenatis. Etiam tempor orci eu lobortis elementum nibh. In massa tempor nec feugiat. Vitae auctor eu augue ut lectus arcu bibendum at. Duis tristique sollicitudin nibh sit amet commodo nulla facilisi. Mattis pellentesque id nibh tortor id aliquet lectus. Maecenas pharetra convallis posuere morbi leo urna molestie. Amet dictum sit amet justo.

        Ut aliquam purus sit amet luctus venenatis lectus magna. Elementum curabitur vitae nunc sed velit dignissim sodales. Et egestas quis ipsum suspendisse ultrices gravida. Sed viverra tellus in hac. Auctor urna nunc id cursus metus aliquam. Hendrerit gravida rutrum quisque non. Nec dui nunc mattis enim ut tellus. Dignissim convallis aenean et tortor at. Facilisi morbi tempus iaculis urna id volutpat. Duis ut diam quam nulla porttitor massa id neque. Enim ut sem viverra aliquet eget sit amet tellus. Pulvinar pellentesque habitant morbi tristique. Massa tincidunt nunc pulvinar sapien et ligula. Tempor orci dapibus ultrices in iaculis nunc. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. Enim sed faucibus turpis in. Nunc faucibus a pellentesque sit.
    `;


    encode(encrypt(originalText), 'encrypted.png')
    console.log('Decrypted successfully:', originalText === decrypt(await decode('encrypted.png')));
})()
