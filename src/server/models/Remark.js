import mongoose from 'mongoose';

export default mongoose.model(
  'Remark',
  new mongoose.Schema({
    chunk: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    comment: {
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
