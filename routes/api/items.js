import { Router } from 'express';
import auth from '../../middleware/auth';
// Item Model
import Item from '../../models/Item';

const router = Router();

/**
 * @route   GET api/items
 * @desc    Get All Items
 * @access  Public
 */

router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    if (!items) throw Error('No items');

    res.status(200).json(items);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   PUT api/items
 * @desc    Update An Item
 * @access  Private
 */

router.put('/:id', auth, async (req, res) => {
  Item.findOneAndUpdate({_id: req.params.id},
    {$set: req.body},
    { upsert: true},
    (err, newItem) => {
        if(err) throw err;
        res.json(newItem);
    })
});

/**
 * @route   POST api/items
 * @desc    Create An Item
 * @access  Private
 */

router.post('/', auth, async (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });

  try {
    const item = await newItem.save();
    if (!item) throw Error('Something went wrong saving the item');

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

/**
 * @route   DELETE api/items/:id
 * @desc    Delete A Item
 * @access  Private
 */

router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) throw Error('No item found');

    const removed = await item.remove();
    if (!removed)
      throw Error('Something went wrong while trying to delete the item');

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(400).json({ msg: e.message, success: false });
  }
});

export default router;
