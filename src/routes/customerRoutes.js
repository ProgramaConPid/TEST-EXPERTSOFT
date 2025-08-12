import express from 'express';
import { connection } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  })
})

export default router;