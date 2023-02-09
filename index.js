const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

require("dotenv").config();

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE

},
console.log('connected to database')
)
db.connect((err) => {
    if (err) throw err;
    // execute main function
    console.log('Connected!');
    const sql = ``
    db.query()
})