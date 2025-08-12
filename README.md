# ExpertSoft Fintech Data Organizer

## 📌 Project Overview  
This repository houses the solution for a performance test (Module 4: SQL Databases), aimed at converting disorganized financial data from Fintech platforms (Nequi, Daviplata) into a structured, relational system. It includes the database model design, DDL scripts, CSV loading mechanism, and frontend/backend components for CRUD operations and data exploration.

---

## 📂 Repository Structure

```
TEST-EXPERTSOFT/
│
├── database/
│   ├── MER-ExpertSoft.drawio.png       # Entity-Relationship Model (visual)
│   └── MER-explanation.md              # Description and details of the MER
│
├── src/                                # Source code (backend/frontend)
│   └── … (Express API, dashboard, scripts, etc.)
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md                           # (this file)
```

---

## 🎯 Purpose and Key Sections

- **database/**: Contains the visual MER and its conceptual explanation.
- **src/**: Implements the application logic—includes the Express backend (CRUD and advanced query endpoints), frontend dashboard (simple UI for CRUD), and the CSV import process.
- **MER-explanation.md**: Offers a textual breakdown of entities, relationships, and normalization decisions.

---

## ⚙️ How to Run the Project

### Prerequisites  
- Node.js and npm  
- MySQL (or compatible SQL server)  
- Git

### Steps

1. **Clone the repository**  
   ```bash
   git clone https://github.com/ProgramaConPid/TEST-EXPERTSOFT.git
   cd TEST-EXPERTSOFT
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Set up the database**  
   - Use the `database/` folder’s MER as guidance.
   - Write and run the DDL scripts to create the necessary tables (names in English, with PKs/FKs).

4. **Import data from CSV**  
   - Convert the original Excel to CSV.
   - Load data in proper order (clients → invoices → transactions), preserving primary and foreign keys.

5. **Run the backend server**  
   ```bash
   npm start
   ```

6. **Access the dashboard**  
   Open the provided frontend (e.g., `index.html`) in your browser to manage entities via CRUD operations.

7. **Use Postman**  
   The project should include endpoints for:
   - CRUD operations
   - Advanced queries: total paid per client, pending invoices, transactions by platform  
   Import the Postman collection (if provided) or test manually.

---

# 📊 How was implemented the normalization

basically, the normalization of the data.xlsx file was based on breaking down the complete table into other tables that include the attributes according to it and the respective data and corresponding relationships for the smooth flow of queries. Thanks to this process, 3 .csv files could be extracted. to later populate the database in question.

## 🗄 Explanation of the MER (Entity-Relationship Model)

The MER diagram (`MER-ExpertSoft.drawio.png`) visualizes the normalized relational schema:

- **Clients**  
  *Attributes*: client_id (PK), full_name, identification_number, address, phone, email.

- **Invoices**  
  *Attributes*: invoice_id (PK), billing_period, billed_amount, paid_amount, client_id (FK → Clients).

- **Transactions**  
  *Attributes*: transaction_id (PK), transaction_datetime, transaction_amount, transaction_status, transaction_type, platform, invoice_id (FK → Invoices).

**Relationships**:
- One **Client** can have many **Invoices** (1:N).
- One **Invoice** can have many **Transactions** (1:N).

The normalization ensures elimination of redundancy and upholds data integrity.

For more detailed explanations, refer to `database/MER-explanation.md`.

---

## 📝 Final Notes

This README serves as a comprehensive guide to understand and operate the project.  
Feel free to customize details (e.g., repo URL, CSV paths, endpoint examples) to match your implementation.