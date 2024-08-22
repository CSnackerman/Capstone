import mongoose from 'mongoose';

export default mongoose.model(
  'Composition',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    composition: {
      type: String,
      required: true,
    },
  })
);
