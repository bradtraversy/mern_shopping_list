import { Router } from 'express';
import auth from '../../middleware/auth';
// Item Model
import Registration from '../../models/Registration';

const router = Router();

/**
 * @route   GET api/registrations
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', auth, async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query
    const count = await Registration.count({});
    const registrations = await Registration.find()
    .limit(limit)
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
 * @access  Public
 */

router.get('/:id', auth, async (req, res) => {
  try {
    const includeSsn = Object.getOwnPropertyDescriptor('includeSsn')
    const registration = await Registration.find({
      _id: id
    });
    if (!registration) throw Error('No registrations');

    res.status(200).json({data: registration});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post('/', async (req, res) => {
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
    ssn,
    registerDate
  });

  try {
    const registration = await newRegistration.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json({ msg: 'Registration successful'});
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

export default router;
