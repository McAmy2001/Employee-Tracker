const mysql = require('mysql2');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'WeRealCool2022!',
    database: 'company_staff'
  },
  console.log('Connected to the company_staff database.')
);

module.exports = db;