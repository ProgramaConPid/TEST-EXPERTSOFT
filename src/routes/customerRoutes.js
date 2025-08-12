import express from 'express';
import { connection } from '../db.js';

// Obtain the routes from express
const router = express.Router();

// Obtain all the customers
router.get('/', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  })
})

// Update a specific customer data
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, identification, address, phone, email } = req.body;

  if (!name || !identification || !address || !phone || !email) {
    return res.status(400).json({ message: "Every field is required." });
  }

  connection.query(
    "UPDATE customers SET full_name = ?, identification_number = ?, address = ?, phone = ?, email = ? WHERE client_id = ?",
    [name, identification, address, phone, email, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: err.message });
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Customer not found." });
      }
      res.json({ message: "Customer updated successfully" });
    }
  );
});

// Delete a specific customer by ID
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

// Export the router to the file server.js
export default router;