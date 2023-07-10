require('dotenv').config();
import { sign } from 'jsonwebtoken';

export async function generateToken(id) {
  return sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 30 * 24 * 60 * 60,
  });
}
