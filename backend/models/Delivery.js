import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  carState: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  nationalId: {
    type: String,
    required: true,
  },
  driversLicense: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Delivery', deliverySchema);
