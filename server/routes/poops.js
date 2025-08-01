import express from 'express';
import jwt from 'jsonwebtoken';
import { addPoop, getRecentPoops } from '../models/Poop.js';

const router = express.Router();

function auth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
}

router.post('/', auth, async (req, res) => {
  const { lat, lng, description } = req.body;
  const poop = await addPoop(req.user.id, lat, lng, description);
  res.json(poop);
});

router.get('/', async (_req, res) => {
  res.json(await getRecentPoops());
});

export default router;
