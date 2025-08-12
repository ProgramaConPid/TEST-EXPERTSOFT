import fs from "fs";
import csv from "csv-parser";
import { connection } from "../db.js";

// Funtcion in charge to load CSV file to DB 
export async function loadCSVtoDB(filePath) {
  try {
    // Verify if exists customers in the table
    const [rows] = await connection.promise().query(
      "SELECT COUNT(*) AS count FROM customers"
    );

    if (rows[0].count > 0) {
      console.log("the client table already has data, the CSV is not loaded.");
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
              "INSERT INTO customers (client_id, full_name, identification_number, address, phone, email) VALUES (?, ?, ?, ?, ?, ?)",
              [row.cliend_id,row.full_name, row.identification_number, row.address, row.phone, row.email]
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
}
