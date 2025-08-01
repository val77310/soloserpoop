import express from 'express';
import jwt from 'jsonwebtoken';
import { createUser, findByCredentials } from '../models/User.js';
const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await createUser(username, password);
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    res.json({ token, username: user.username });
  } catch (err) {
    res.status(400).json({ error: 'Username taken' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await findByCredentials(username, password);
  if (!user) return res.status(401).json({ error: 'Invalid creds' });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  res.json({ token, username: user.username });
});

export default router;
