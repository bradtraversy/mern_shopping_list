import bcrypt from 'bcryptjs';

import config from '../config';
import User from '../models/User';

const SALT_ROUNDS = 10
export const createIntialAdmin = async () => {
  const { email, password } = config.DEFAULT_ADMIN
  const user = await User.findOne({ email })
  if(user) {
    await user.remove()
  }
  if(true || !user) {
    await new User({
      email,
      password: await bcrypt.hash(password, SALT_ROUNDS)
    }).save()
  }
}