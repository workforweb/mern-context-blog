require('dotenv').config();
import jwt from 'jsonwebtoken';
import User from '../models/user';

async function auth(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.json({ status: false });

  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_KEY);
    if (!verifiedUser)
      return res.status(401).json({ msg: 'Token is not valid' });

    const user = await User.findById(verifiedUser.id);

    req.user = user;
    next();
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}

export default auth;
