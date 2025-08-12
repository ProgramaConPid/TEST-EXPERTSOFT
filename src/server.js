import express from 'express';
import path from 'path';
import { connection } from './db.js'

// Settings
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'src', 'views')));

// Endpoints

// Get customers from database
app.get('/customers', (req, res) => {
  connection.query('SELECT * FROM customers', (err, results) => {
    if (err) throw err;
    res.json(results)
  })
});

app.post('/customers/', (req, res) => {
  const { name, identification, address, phone, email } = req.body;
})

// Starting the server
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
});