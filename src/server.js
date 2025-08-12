// Important frameworks, librarys and functions
import express from 'express';
import path from 'path';
import { loadCSVtoDB } from './utils/csvLoader.js';
// import { loadCSVTransactionsToDB } from './utils/csvLoaderTransactions.js';
// import { loadCSVInvoicesToDB } from './utils/csvLoaderInvoices.js';
import customersRoutes from './routes/customerRoutes.js';

// Settings
const app = express();
const PORT = 3000;

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'src', 'views')));

// Endpoints
app.use('/customers', customersRoutes);

// default CSV Customers file for charge
const customersCSV = path.join(process.cwd(), "src", "data", "customers.csv");
// const transactionsCSV = path.join(process.cwd(), "src", "data", "transactions.csv");
// const invoicesCSV = path.join(process.cwd(), "src", "data", "invoices.csv");


// Starting the server
app.listen(PORT, async () => {
  console.log('Server running on port', PORT)
  try {
    await loadCSVtoDB(customersCSV);
    // await loadCSVTransactionsToDB(transactionsCSV);
    // await loadCSVInvoicesToDB(invoicesCSV)
    console.log('All the data uploaded succesfully')
  } catch(err) {
    console.log("ERROR, Data can not upload", err.message)
  }
});