import express from 'express';
import Composition from '../models/Composition.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const composition = new Composition(req.body);

    const data = await composition.save();

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
