import { Router } from 'express';

import aesEncryption from '../../helpers/aesEncryption'
import auth from '../../middleware/auth';
// Item Model
import Registration from '../../models/Registration';
import { postRegistration } from '../../middleware/Registration';


const router = Router();

/**
 * @route   GET api/registrations
 * @desc    Get All registrations
 * @access  Private
 */

router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1)
    const limit =  parseInt(req.query.limit || 100)
    const count = await Registration.count({});
    const registrations = await Registration.find()
    .select({
      ssnData: 0
    })
    .limit(parseInt(limit))
    .skip((page - 1) * limit);
    if (!registrations) throw Error('No registrations');
    res.status(200).json({
      data: registrations,
      metaData: {
        count
      }
    });
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   GET api/registrations/:id
 * @desc    Get full details of registration
 * @access  Private
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const { id } = req.params
    const includeSsn = Object.getOwnPropertyDescriptor(req.query, 'includeSsn')
    const registration = await Registration.findById(id).select({
      ...(!includeSsn && { ssnData: 0 })
    });
    if (!registration) throw Error('No registrations');
    if(includeSsn) {
      registration._doc.ssn = aesEncryption.decrypt(registration.ssnData)
      delete registration._doc.ssnData
    }
    res.status(200).json({data: registration});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/registration
 * @desc    Create A Registration
 * @access  Public
 */

router.post('/', postRegistration, async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    address,
    ssn,
    registerDate
  } = req.body
  const newRegistration = new Registration({
    firstName,
    lastName,
    phoneNumber,
    address,
    ssnData: aesEncryption.encrypt(ssn.toUpperCase()),
    registerDate
  });

  try {
    const registration = await newRegistration.save();
    if (!registration) throw Error('Something went wrong saving the registration');

    res.status(200).json({ msg: 'Registration successful'});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
