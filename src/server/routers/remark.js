import express from 'express';
import mongoose from 'mongoose';
import Remark from '../models/Remark.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const remark = new Remark(req.body);

    const data = await remark.save();

    res.json(data);
  } catch (err) {
    console.log('[post-remark]', err);
    if (err?.name === 'ValidationError') {
      res.status(400).json(err.errors);
      return;
    }

    res.status(500).json(err.errors);
  }
});

router.get('/', async (req, res) => {
  try {
    const { chunk } = req.query;

    if (!chunk) throw [400, 'invalid remark request'];

    const remarks = await Remark.find({ chunk }).exec();

    res.json(remarks);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(500).json({
        errType: 'MongooseError',
        errName: err.name,
        errMsg: err.message,
      });

      return;
    }

    if (Array.isArray(err)) {
      const [status, errMsg] = err;
      res.status(status).json({ errMsg });
      return;
    }

    res.status(500).send('[remark-get] an error occurred');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await Remark.findByIdAndDelete(req.params.id).exec();

    if (!result) throw [410, 'cannot delete that which has not bytes'];

    res.json(result);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(500).json({
        errType: 'MongooseError',
        errName: err.name,
        errMsg: err.message,
      });

      return;
    }

    if (Array.isArray(err)) {
      const [status, errMsg] = err;
      res.status(status).json({ errMsg });
      return;
    }

    res.status(500).send('[remark-delete] an error occurred');
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const result = await Remark.findByIdAndUpdate(req.params.id, req.body);

    if (!result) throw [404, 'remark not found -- update failed'];

    res.json(result);
  } catch (err) {
    if (err instanceof mongoose.Error) {
      res.status(500).json({
        errType: 'MongooseError',
        errName: err.name,
        errMsg: err.message,
      });

      return;
    }

    if (Array.isArray(err)) {
      const [status, errMsg] = err;
      res.status(status).json({ errMsg });
      return;
    }

    res.status(500).send('[remark-patch] an error occurred');
  }
});

export default router;
