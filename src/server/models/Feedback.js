import mongoose from 'mongoose';

export default mongoose.model(
  'Feedback',
  new mongoose.Schema(
    {
      from: {
        type: String,
        required: true,
      },
      email: String,
      message: {
        type: String,
        required: true,
      },
    },
    { collection: 'feedback' }
  )
);
