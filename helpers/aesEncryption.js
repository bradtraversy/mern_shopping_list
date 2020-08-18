import crypto from 'crypto';
import config from '../config';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = Buffer.from(config.ENCRYPTION_KEY, 'hex') // crypto.randomBytes(32);
const ENCRYPTION_IV = Buffer.from(config.ENCRYPTION_IV, 'hex') // crypto.randomBytes(16);


export default {
  encrypt: text => {
    let cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, ENCRYPTION_IV);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return [ENCRYPTION_IV, encrypted].map(d => d.toString('hex')).join('::');
  },
  decrypt: text => {
    const [iv, encryptedText] = text.split('::').map(d => Buffer.from(d, 'hex'));
    let decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}