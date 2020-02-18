import { Schema, model } from 'mongoose';

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Item = model('item', ItemSchema);

export default Item;
