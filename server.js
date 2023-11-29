const inquirer = require('inquirer');
require("console.table");
const mysql = require('mysql2');


const db = mysql.createConnection;(
{
 PORT : process.env.PORT || 3001
},


// Connect to database
 db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'BlueCord#1',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
));

db.connect((err) => {
    if (err) throw err;
    console.log("Employee Tracker");
    mainMenu();
  });


