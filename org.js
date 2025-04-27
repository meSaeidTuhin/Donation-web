const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Default password for XAMPP is blank
    database: 'hopeharbor'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database');
});

// POST endpoint
app.post('/registerOrganization', (req, res) => {
    const {
        org_name, org_id, org_type, email,
        org_description, country, payment_gateway,
        org_website, password
    } = req.body;

    const sql = `INSERT INTO organizations 
        (org_name, org_id, org_type, email, org_description, country, payment_gateway, org_website, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [
        org_name, org_id, org_type, email,
        org_description, country, payment_gateway,
        org_website, password
    ], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            res.status(500).json({ message: 'Failed to register organization.' });
        } else {
            res.status(200).json({ message: 'Organization registered successfully!' });
        }
    });
});

app.listen(port, () => {
    console.log(Server is running at http://localhost:${port});
});
