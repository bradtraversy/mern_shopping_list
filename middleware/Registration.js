import jwt from 'jsonwebtoken';
import config from '../config';
import Registration from '../models/Registration';
import aesEncryption from '../helpers/aesEncryption';

const { JWT_SECRET } = config;
export const postRegistration = async (req, res, next) => {
  try {
    const { ssn } = req.body
    const user = await Registration.findOne({
      ssnData: aesEncryption.encrypt(ssn.toUpperCase())
    })
    if(user) {
      return res.status(400).json({ msg: 'SSN already registered.' })
    }
    next()
  } catch(ex) {
    console.log(ex)
    res.status(500).json({ msg: 'Internal Error' })
  }
}
