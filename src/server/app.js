import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import composition from './routers/composition.js';
import feedback from './routers/feedback.js';
import remark from './routers/remark.js';
import review from './routers/review.js';

// env

dotenv.config();

const { PORT = 4040, MONGODB = '' } = process.env;

// database (mongo)

const db = mongoose.connection;

db.on('error', (err) => console.log(`\x1b[31m[mongodb] ${err}\x1b[0m`));

db.once('open', () => console.log('[mongodb] connection opened'));

mongoose.connect(MONGODB).catch(() => {});

/* Express app */

const app = express();

// middleware

const cors = (req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type, Accept,Authorization,Origin'
  );
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
};

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url} ${new Date().toLocaleString('en-US')}`);
  next();
};

app.use(cors);
app.use(logger);
app.use(express.json());

// routes

app.get('/status', (req, res) => {
  res.send(JSON.stringify({ status: 'healthy' }));
});

app.use('/feedback', feedback);
app.use('/composition', composition);
app.use('/review', review);
app.use('/remark', remark);

app.listen(PORT, () => console.log('[api] listening on port', PORT));
