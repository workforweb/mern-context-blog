import { randomBytes } from 'crypto';

export function generateJwtSecret(num) {
  return randomBytes(num).toString('hex');
}
// 'hex'
// 'base64'
