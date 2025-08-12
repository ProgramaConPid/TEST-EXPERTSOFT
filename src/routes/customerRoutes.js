import express from 'express';
import { connection } from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  })
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    "DELETE FROM customers WHERE client_id = ?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json({ message: "Customer deleted successfully" });
    }
  );
});

export default router;