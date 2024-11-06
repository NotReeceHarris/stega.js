import { PNG } from 'pngjs';

const encodeMap: { [key: string]: number } = {
    '0': 254,
    '1': 253,
    '2': 252,
    '3': 251,
    '4': 250,
    '5': 249,
    '6': 248,
    '7': 247,
    '8': 246,
    '9': 245,
    'a': 244,
    'b': 243,
    'c': 242,
    'd': 241,
    'e': 240,
    'f': 239,
    'undefined': 255
};

export default async function encode(hex: string, inputBuffer: Buffer): Promise<Buffer> {

    if (!/^[0-9a-fA-F]*$/.test(hex)) {
        throw new Error('Invalid hex string. Please provide a valid hex string.');
    }
    
    try {
        PNG.sync.read(inputBuffer)
    } catch (error: any) {
        if (error.message === 'unrecognised content at end of stream') {
            throw new Error('Invalid PNG file. Please provide a valid PNG file.');
        }
        return Buffer.from('');
    }
    
    const png = PNG.sync.read(inputBuffer);
    const hexLength = hex.length;
    let count = 0;

    for (let i = 0; i < png.data.length; i += 4) {
        if (count < hexLength) {
            png.data[i + 3] = encodeMap[hex[count]] || 0;
            count++;
        } else {
            break;
        }
    }

    return PNG.sync.write(png);
}