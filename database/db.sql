CREATE DATABASE db_juan_marin_linus;
USE db_juan_marin_linus;

CREATE TABLE customers (
  client_id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  identification_number VARCHAR(10) NOT NULL,
  address VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(50) NOT NULL
);

CREATE TABLE invoices (
  invoice_id INT AUTO_INCREMENT PRIMARY KEY,
  billed_number VARCHAR(50) NOT NULL,
  billing_period VARCHAR(20) NOT NULL,
  billed_amount DECIMAL NOT NULL,
  paid_amount INT NOT NULL,
  client_id INT NOT NULL,
  FOREIGN KEY (client_id) REFERENCES customers(client_id)
);

CREATE TABLE transactions (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  transaction_datetime DATE NOT NULL,
  transaction_amount INT NOT NULL,
  transaction_status VARCHAR(50) NOT NULL,
  transaction_type VARCHAR(50) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  invoice_id INT NOT NULL,
  FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id)
);

