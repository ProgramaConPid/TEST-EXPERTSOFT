import fs from "fs";
import csv from "csv-parser";
import { connection } from "../db.js";

// Funtcion in charge to load CSV file to DB 
export async function loadCSVTransactionsToDB(filePath) {
  try {
    // Verify if exists invoices data in the table
    const [rows] = await connection.promise().query(
      "SELECT COUNT(*) AS count FROM transactions"
    );

    if (rows[0].count > 0) {
      console.log("the transactions table already has data, the CSV is not loaded.");
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
              "INSERT INTO transactions (transaction_id, transaction_datetime, transaction_amount, transaction_status, transaction_type, platform, invoice_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [row.transaction_id,row.transaction_datetime, row.transaction_amount, row.transaction_status, row.transaction_type, row.platform, row.invoice_id]
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
