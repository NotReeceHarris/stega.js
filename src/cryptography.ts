import crypto from 'crypto';

export async function keys(password: string): Promise<{ key: Buffer, iv: Buffer }> {
    const key = crypto.scryptSync(password, 'salt', 24);
    const iv = crypto.randomBytes(16);

    return {
        key: key,
        iv: iv
    }
}

export async function encrypt(data: Buffer, key: { key: Buffer, iv: Buffer }): Promise<Buffer> {
    const cipher = crypto.createCipheriv('aes-192-cbc', key.key, key.iv);
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted;

}

export async function decrypt(data: Buffer, key: { key: Buffer, iv: Buffer }): Promise<Buffer> {
    const decipher = crypto.createDecipheriv('aes-192-cbc', key.key, key.iv);
    let decrypted = decipher.update(data);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted;
}

export default {
    keys,
    encrypt,
    decrypt
}