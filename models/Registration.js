import { Schema, model } from 'mongoose';

// Create Schema
const RegistrationSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  ssnData: {
    type: String,
    required: true
  },
  registerDate: {
    type: Date,
    default: Date.now
  }
});

const Registration = model('Registration', RegistrationSchema);

export default Registration;
