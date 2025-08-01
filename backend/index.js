import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Routes
app.get('/poops', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM poops ORDER BY created_at DESC');
  res.json(rows);
});

app.post('/poops', async (req, res) => {
  const { lat, lng, message } = req.body;
  await pool.query(
    'INSERT INTO poops (lat, lng, message, created_at) VALUES ($1,$2,$3,NOW())',
    [lat, lng, message]
  );
  res.status(201).json({ success: true });
});

app.listen(3000, () => console.log('🚀 Backend running on port 3000'));