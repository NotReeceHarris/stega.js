const stega = require('./dist');
const fs = require('fs');

const message = 'Hello, World!';
console.log('🪵  | file: test.js:5 | message:', message);
const password = 'password';
console.log('🪵  | file: test.js:7 | password:', password);
const data = fs.readFileSync('./stegosaurus.png');

(async () => {
    const key = await stega.cryptography.keys(password);
    console.log('🪵  | file: test.js:11 | key:', key);

    const encrypted = await stega.cryptography.encrypt(message, key);
    console.log('🪵  | file: test.js:14 | encrypted:', encrypted.toString());
    const encryptedHex = encrypted.toString('hex');
    console.log('🪵  | file: test.js:16 | encryptedHex:', encryptedHex);
    const encoded = await stega.alpha.encode(encryptedHex, data);
    console.log('🪵  | file: test.js:18 | encoded:', encoded);

    const decoded = await stega.alpha.decode(encoded);
    console.log('🪵  | file: test.js:21 | decoded:', decoded);
    const decrypted = await stega.cryptography.decrypt(decoded, key);
    console.log('🪵  | file: test.js:25 | decrypted:', decrypted.toString());
})();
