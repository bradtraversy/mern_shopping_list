import bcrypt from 'bcryptjs';

import config from '../config';
import User from '../models/User';
import Registration from '../models/Registration';

const SALT_ROUNDS = 10
export const createIntialAdmin = async () => {
  const { email, password } = config.DEFAULT_ADMIN
  // await Registration.deleteMany({})
  const user = await User.findOne({ email })
  if(!user) {
    await new User({
      email,
      password: await bcrypt.hash(password, SALT_ROUNDS)
    }).save()
  }
}