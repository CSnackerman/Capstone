import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);

    const data = await review.save();

    res.json(data);
  } catch (err) {
    console.log('[api]', err);
    if (err?.name === 'ValidationError') {
      res.status(400).json(err.errors);
      return;
    }
    res.status(500).json(err.errors);
  }
});

export default router;
