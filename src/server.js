import express from 'express';
import path from 'path';
import { loadCSVtoDB } from './utils/csvLoader.js';
import customersRoutes from './routes/customerRoutes.js'

// Settings
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'src', 'views')));

// Endpoints
app.use('/customers', customersRoutes)

// default CSV Customers file for charge
const defaultCSV = path.join(process.cwd(), "src", "data", "customers.csv");

// Starting the server
app.listen(PORT, async () => {
  console.log('Server running on port', PORT)
  try {
    await loadCSVtoDB(defaultCSV)
    console.log('Data uploaded successfully')
  } catch(err) {
    console.log("ERROR, Data can not upload", err.message)
  }
});