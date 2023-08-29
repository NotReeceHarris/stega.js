const aes = require('./encryption')
const pixel = require('./encoder')

const inputFilePath = 'input.jpg';
const outputFilePath = 'formatted.png';
const encodedFilePath = 'encoded.png';

const keys = {
    key: 'f4837828139f44df29e527724821ac4aec87390fbd661a848da982d1d61d4eae',
    nonce: 'ae05ab3418a45d87f6ac744a'
} // aes.keys();

const text = Buffer.from('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Parturient montes nascetur ridiculus mus mauris. Quam lacus suspendisse faucibus interdum posuere lorem. Habitasse platea dictumst quisque sagittis purus. Posuere ac ut consequat semper viverra nam libero justo. Feugiat nisl pretium fusce id velit. In mollis nunc sed id semper risus in hendrerit gravida. Nibh praesent tristique magna sit amet purus gravida. Etiam non quam lacus suspendisse faucibus interdum posuere lorem ipsum. Porta non pulvinar neque laoreet. Vulputate sapien nec sagittis aliquam.', 'ascii');

// pixel.format(inputFilePath, outputFilePath)

/* pixel.encode(text, outputFilePath, encodedFilePath, keys).then((tag) => {
    console.log(tag)
    // {
    //    key: 'f4837828139f44df29e527724821ac4aec87390fbd661a848da982d1d61d4eae',
    //    nonce: 'ae05ab3418a45d87f6ac744a',
    //    tag: '83cbb6cd3baf709aff8564c7c3374af7'
    // }
}) */

/* pixel.decode(encodedFilePath, keys, '83cbb6cd3baf709aff8564c7c3374af7').then(decoded => {
    console.log(decoded.toString('ascii'));
}) */