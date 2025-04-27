const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',       // your MySQL password, default is empty on XAMPP
  database: 'hopeharbor' // make sure this DB exists
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
  } else {
    console.log('Connected to MySQL database!');
  }
});

// POST route to register user
app.post('/register', (req, res) => {
  const { name, email, password, phone, country } = req.body;

  const query = 'INSERT INTO donors (name, email, password, phone, country) VALUES (?, ?, ?, ?, ?)';
  const values = [name, email, password, phone, country];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data: ', err);
      res.status(500).send('Error registering user.');
    } else {
      res.send('User registered successfully!');
    }
  });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
