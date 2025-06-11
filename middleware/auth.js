import jwt from 'jsonwebtoken';
import config from '../config/index.js';
import User from '../models/User.js';

const { JWT_SECRET } = config;

export default async (req, res, next) => {
  // Token header se lo
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'Please Login' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = {
      id: user._id,
      username: user.username,
      role: user.role,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
