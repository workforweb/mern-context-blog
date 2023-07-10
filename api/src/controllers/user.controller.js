import User from '../models/user';
import AppError from '../utils/customError';
import { generateToken } from '../utils/generateToken';

export default {
  signup: async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) return next(new AppError(400, 'User already exists'));

      await User.create({ email, password, username });

      res.status(201).json({ message: 'user created!' });
      next();
    } catch (error) {
      next(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res.json({ message: 'All fields are required' });

      const user = await User.findOne({ email });
      if (!user) return res.json({ message: 'Incorrect password or email' });

      const auth = await user.comparePasswords(password, user.password);
      if (!auth) return res.json({ message: 'Incorrect password or email' });

      const token = await generateToken(user.id);
      res.cookie('token', token, {
        // withCredentials: true,
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        sameSite: 'none',
      });
      res.status(200).json({ user });
      next();
    } catch (error) {
      next(error);
    }
  },
  logout: async (req, res, next) => {
    return res
      .clearCookie('token')
      .status(200)
      .json({ message: 'Successfully logged out!' });
  },
};
