import mysql from 'mysql2';

// Connection with mysql database
export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '0520Kelz*',
  database: 'db_juan_marin_linus'
})

// Verify the connection through mysql
connection.connect(err => {
  if (err) throw err;
  console.log("Connection to the database success!")
})