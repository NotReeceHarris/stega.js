const generateRandomNumber = (min, max) => (require('crypto').randomBytes(4).readUInt32LE(0) % (max - min + 1)) + min;;
const generateFrame = (w = 64, h = 64) => [...Array.from({ length: h }, () => new Array(w).fill(0))];

const displayFrame = (frame, map) => '\n' + frame.map(y => y.map(x => `${map[x]}   ${Reset}`).join('') + '\n').join('');
const adjustNumber = (num) => num === 10 ? 9 : num < 0 ? 0 : num;

function bilinearInterpolation(x, y, points) {
    const x0 = Math.floor(x);
    const x1 = Math.ceil(x);
    const y0 = Math.floor(y);
    const y1 = Math.ceil(y);

    const q00 = points[y0][x0];
    const q01 = points[y0][x1];
    const q10 = points[y1][x0];
    const q11 = points[y1][x1];

    const tx = x - x0;
    const ty = y - y0;

    const interpolatedValue = 
        (1 - tx) * (1 - ty) * q00 +
        tx * (1 - ty) * q01 +
        (1 - tx) * ty * q10 +
        tx * ty * q11;

    return interpolatedValue;
}

function smoothArrayWithInterpolation(array) {
    const newArray = [];

    for (let y = 0; y < array.length; y++) {
        const newRow = [];

        for (let x = 0; x < array[y].length; x++) {
            const interpolatedValue = bilinearInterpolation(x, y, array);
            newRow.push(interpolatedValue);
        }

        newArray.push(newRow);
    }

    return newArray;
}


const heightGeneration = (frame, seed=null) => {

    const { createNoise2D } = require('simplex-noise');
    let noise2D = null

    if (seed != null) {
        const alea = require('alea')
        const prng = new alea('seed')
        noise2D = createNoise2D(prng);
    } else {
        noise2D = createNoise2D();
    }

    frame.forEach((y, yindex) => {
        y.forEach((x, xindex) => {
            let noise = noise2D(xindex, yindex)
            noise = String(String(noise).replace('-', '').split('.')[1])[0]
            noise = noise === 'u' ? 0 : Number(noise)
            frame[yindex][xindex] = generateRandomNumber(0,9)
        });
    });

    return frame
}

const generateFile = (frame, map) => {
    const fs = require('fs');
    const { createCanvas } = require('canvas');

    // Define dimensions for your array of arrays (e.g., width and height)
    const width = frame[0].length;
    const height = frame.length;

    // Create a canvas
    const canvas = createCanvas(width, height);
    const context = canvas.getContext('2d');

    frame.forEach((y, yIndex) => {
        y.forEach((x, xIndex) => {
            context.fillStyle = map(x);
            context.fillRect(yIndex, xIndex, 1, 1);
        });
    });

    // Save the canvas as a PNG file
    const stream = fs.createWriteStream('output.png');
    const pngStream = canvas.createPNGStream();
    pngStream.pipe(stream);
    stream.on('finish', () => {
        console.log('PNG file saved.');
    });
}

const generateBetter = (x=100,y=100) => {
    const fs = require('fs');
    const { createCanvas } = require('canvas');
    const { createNoise2D } = require('simplex-noise');


    const canvas = createCanvas(x, y);
    const context = canvas.getContext('2d');
    const noise2D = createNoise2D();

    for (let yindex = 0; yindex < y; yindex++) {
        for (let xindex = 0; xindex < x; xindex++) {
            const noise = noise2D(xindex, yindex)

            console.log(xindex, yindex, noise)

            context.fillStyle = map(noise);
            context.fillRect(yindex, xindex, 1, 1);
        }
    }

    // Save the canvas as a PNG file
    const stream = fs.createWriteStream('output.png');
    const pngStream = canvas.createPNGStream();
    pngStream.pipe(stream);
    stream.on('finish', () => {
        console.log('PNG file saved.');
    });
}

const map = (height) => {

    if (height > 1) {
        return '#cc2828'
    }

    return '#ffffff'

    switch (height) {
        case 0:
            return '#7a28cc';
        case 1:
            return '#2828cc';
        case 2:
            return '#287acc';
        case 3:
            return '#28cccc';
        case 4:
            return '#28cc7a';
        case 5:
            return '#28cc28';
        case 6:
            return '#cccc28';
        case 7:
            return '#cc7a28';
        default:
            return '#cc2828';
    }
}

//const frame = generateFrame(64*100,64*100)
//const noisy = heightGeneration(frame)
//const smooth = smoothArrayWithInterpolation(noisy);

//generateFile(smooth, map)

//console.log(displayFrame(noisy, map))
//console.log(displayFrame(smooth, map))

generateBetter(400,400)