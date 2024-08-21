import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);

    const data = await feedback.save();

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
