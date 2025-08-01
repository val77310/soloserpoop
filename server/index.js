import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth.js';
import poopRoutes from './routes/poops.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/poops', poopRoutes);

app.get('/', (_req, res) => res.send('💩 Poop Map API running'));

app.listen(4000, () => console.log('API on :4000'));
