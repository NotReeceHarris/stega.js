import { PNG } from 'pngjs';

const decodeMap: { [key: number]: string } = {
    254: '0',
    253: '1',
    252: '2',
    251: '3',
    250: '4',
    249: '5',
    248: '6',
    247: '7',
    246: '8',
    245: '9',
    244: 'a',
    243: 'b',
    242: 'c',
    241: 'd',
    240: 'e',
    239: 'f',
    255: ''
};

export default async function decode(inputBuffer: Buffer): Promise<Buffer> {

    try {
        PNG.sync.read(inputBuffer)
    } catch (error: any) {
        if (error.message === 'unrecognised content at end of stream') {
            throw new Error('Invalid PNG file. Please provide a valid PNG file.');
        }
        return Buffer.from('');
    }

    const png = PNG.sync.read(inputBuffer);
    let hex = '';

    for (let i = 0; i < png.data.length; i += 4) {
        const alpha = png.data[i + 3];
        hex += decodeMap[alpha];
    }

    return Buffer.from(hex, 'hex');
}