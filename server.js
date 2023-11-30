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
    console.log('connected as id ' + connection.threadId);
    afterConnection();
  });

  afterConnection = () => {
    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")
    console.log("+                            -")
    console.log("-     EMPLOYEE MANAGEMENT    +")
    console.log("+           SYSTEM           -")
    console.log("-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+")
    promptUser();
  };

    inquirer
      .prompt({
        type: "list",
        name: "mainMenu",
        message: "What would you like do?",
        choices: [
          "View all Departments",
          "View all Roles",
          "View all Employees",
          "Add a Department",
          "Add an Employee",
          "Update Employee Role",
          "Exit"
        ]
      })

      .then((mainMenu) => {
        const { choices } = answers; 
  
        if (choices === "View all Departments") {
          showDepartments();
        }
  
        if (choices === "View all Roles") {
          showRoles();
        }
  
        if (choices === "View all Employees") {
          showEmployees();
        }
  
        if (choices === "Add a Department") {
          addDepartment();
        }
  
        if (choices === "Add a Role") {
          addRole();
        }
  
        if (choices === "Add an Employee") {
          addEmployee();
        }
  
        if (choices === "Update an employee role") {
          updateEmployee();
        }
  
        if (choices === "No Action") {
          connection.end()
      };
    });
  ;