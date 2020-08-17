import crypto from 'crypto';
import config from '../config';

const ALGORITHM = 'aes-256-cbc';
const ENCRYPTION_KEY = Buffer.from(config.ENCRYPTION_KEY, 'hex') // crypto.randomBytes(32);


export default {
  encrypt: text => {
    console.log('config.ENCRYPTION_KEY', config.ENCRYPTION_KEY)
    console.log(ENCRYPTION_KEY)
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return [iv, encrypted].map(d => d.toString('hex')).join('::');
  },
  decrypt: text => {
    const [iv, encryptedText] = text.split('::').map(d => Buffer.from(d, 'hex'));
    let decipher = crypto.createDecipheriv(ALGORITHM, ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
}