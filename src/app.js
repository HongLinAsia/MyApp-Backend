const express = require('express');
const app = express();
const pool = require('./db');

app.use(express.json());

app.get('/ping', async (req, res) => {
  const [rows] = await pool.query('SELECT 1 AS ok');
  res.json({ ok: rows[0].ok });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
