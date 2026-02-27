import express from 'express';
const router = express();
import pool from '../config/db.js';

router.use(express.json());

router.get('/ping', async (req, res) => {
  const [rows] = await pool.query('SELECT 1 AS ok');
  res.json({ ok: rows[0].ok });
});

export default router;