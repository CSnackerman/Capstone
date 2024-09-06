import mongoose from 'mongoose';

export default mongoose.model(
  'Review',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    postedAt: {
      type: Date,
      required: true,
      default: new Date(),
    },
  })
);
