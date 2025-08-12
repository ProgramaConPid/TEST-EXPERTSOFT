import fs from "fs";
import csv from "csv-parser";
import { connection } from "../db.js";

// Funtcion in charge to load CSV file to DB 
export async function loadCSVInvoicesToDB(filePath) {
  try {
    // Verify if exists customers in the table
    const [rows] = await connection.promise().query(
      "SELECT COUNT(*) AS count FROM invoices"
    );

    if (rows[0].count > 0) {
      console.log("the invoices table already has data, the CSV is not loaded.");
      return;
    }

    // Read CSV and insert data
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        // Insert data from CSV file
        try {
          await connection
            .promise()
            .query(
              "INSERT INTO invoices (invoice_id, billed_number, billing_period, billed_amount, paid_amount, client_id) VALUES (?, ?, ?, ?, ?, ?)",
              [row.invoice_id,row.billed_number, row.billing_period, row.billed_amount, row.paid_amount, row.client_id]
            );
        } catch (err) {
          console.error("Error inserting row:", err);
        }
      })
      .on("end", () => {
        console.log("CSV data uploaded to the database");
      });
  } catch (err) {
    console.error("Error verifying existing data:", err);
  }
};
