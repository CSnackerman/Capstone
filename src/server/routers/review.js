import express from 'express';
import Review from '../models/Review.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const review = new Review(req.body);

    const data = await review.save();

    res.json(data);
  } catch (err) {
    console.log('[post-review]', err);
    if (err?.name === 'ValidationError') {
      res.status(400).json(err.errors);
      return;
    }

    res.status(500).json(err.errors);
  }
});

router.get('/', async (req, res) => {
  try {
    const { title, author } = req.query;

    if (!title || !author) {
      res.status(400).json({
        errMsg: `invalid query params: author=${author} title=${title}`,
      });
    }

    const reviews = await Review.find({ title, author }).exec();
    res.json(reviews);
  } catch (err) {
    console.log('[get-review]', err);
    res.status(500).json({ errMsg: 'failed to retrieve reviews' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const result = await Review.findOneAndDelete({ _id: req.body.id }).exec();

    if (!result) throw 'failed';

    res.json(result);
  } catch (err) {
    console.log('[delete-review]', err);
    res.status(500).json({ errMsg: 'failed to delete review' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const result = await Review.findByIdAndUpdate(req.params.id, req.body);

    if (!result) {
      res.status(404).json({ errMsg: 'review not found. update failed.' });
    }

    res.json(result);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      console.error('[patch-review] invalid review id');
      res.status(400).json({ errMsg: 'invalid review id' });
      return;
    }

    console.error('[patch-review]', err);
    res.status(500).json({ errMsg: 'failed to update review' });
  }
});

export default router;
