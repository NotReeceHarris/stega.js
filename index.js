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

    if (height > 0.8400) {
        return '#fafafa'
    } else if (height > 0.7670 && height < 0.8400) {
        return '#fab49b'
    } else if (height > 0.6940 && height < 0.7670) {
        return '#fa5e5f'
    } else if (height > 0.6210 && height < 0.6940) {
        return '#fe0000'
    } else if (height > 0.5480 && height < 0.6210) {
        return '#e74600'
    } else if (height > 0.4750 && height < 0.5480) {
        return '#fa8c00'
    } else if (height > 0.4020 && height < 0.4750) {
        return '#fee60a'
    } else if (height > 0.3290 && height < 0.4020) {
        return '#e6aa14'
    } else if (height > 0.2560 && height < 0.3290) {
        return '#be831f'
    } else if (height > 0.2240 && height < 0.2560) {
        return '#9f6418'
    } else if (height > 0.1920 && height < 0.2240) {
        return '#825015'
    } else if (height > 0.1600 && height < 0.1920) {
        return '#4b2f23'
    } else if (height > 0.1280 && height < 0.1600) {
        return '#63643c'
    } else if (height > 0.0960 && height < 0.1280) {
        return '#789656'
    } else if (height > 0.0640 && height < 0.0960) {
        return '#5aaf4a'
    } else if (height > 0.0320 && height < 0.0640) {
        return '#42c84b'
    } else if (height > 0 && height < 0.0320) {
        return '#96dc96'
    } else if (height < 0 && height > -0.0320) {
        return '#d2dcd3'
    } else if (height < -0.0320 && height > -0.0640) {
        return '#abbedc'
    } else if (height < -0.0640 && height > -0.0960) {
        return '#79bedd'
    } else if (height < -0.0960 && height > -0.1280) {
        return '#3dbedd'
    } else if (height < -0.1280 && height > -0.1600) {
        return '#5ae1f5'
    } else if (height < -0.1600 && height > -0.1920) {
        return '#21dfff'
    } else if (height < -0.1920 && height > -0.2240) {
        return '#20beff'
    } else if (height < -0.2240 && height > -0.2560) {
        return '#2096f0'
    } else if (height < -0.2560 && height > -0.3290) {
        return '#0f6edc'
    } else if (height < -0.3290 && height > -0.4020) {
        return '#1040c8'
    } else if (height < -0.4020 && height > -0.4750) {
        return '#2010c8'
    } else if (height < -0.4750 && height > -0.5480) {
        return '#501e91'
    } else if (height < -0.5480 && height > -0.6210) {
        return '#864fb5'
    } else if (height < -0.6210 && height > -0.6940) {
        return '#aa71d8'
    } else if (height < -0.6940 && height > -0.7670) {
        return '#bd6e9e'
    } else if (height < -0.7670 && height > -0.8200) {
        return '#d97ace'
    } else if (height < -0.8200) {
        return '#202020'
    }
    
    

    return '#ffffff'

}

//const frame = generateFrame(64*100,64*100)
//const noisy = heightGeneration(frame)
//const smooth = smoothArrayWithInterpolation(noisy);

//generateFile(smooth, map)

//console.log(displayFrame(noisy, map))
//console.log(displayFrame(smooth, map))

generateBetter(400,400)