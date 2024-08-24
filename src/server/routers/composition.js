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

router.get('/:title/:author', async (req, res) => {
  try {
    const composition = await Composition.findOne(req.params).exec();

    if (!composition) throw 404;

    res.json(composition);
  } catch (err) {
    if (err === 404) {
      res.status(404).json(null);
      return;
    }

    console.log('[composition-get]', Object.keys(err));
    res.status(500).json({ errMsg: '[composition-get] server error' });
  }
});

export default router;
