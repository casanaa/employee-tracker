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
  
    const viewAllDepartments = () => {
      var departments = Department.findAll({ raw: true }).then((data) => {
        console.table(data);

        //Call for View All Departments.
function getAllDepartments() {
  const sql = `SELECT * FROM departments`;
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      } else {
          console.log("\n");
          console.table(res);
      }
      init()
  }); 
  
};
//Call for View All Roles.
async function getAllRoles() {
  const sql = `SELECT * FROM roles`;
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      } else {
          console.log("\n");
          console.table(res);
      }
      init()
  });
  
};
//Call for View All Employees.
function getAllEmployees() {
  const sql = `SELECT * FROM employees`;
  db.query(sql, (err, res) => {
      if (err) {
          throw err;
      } else {
          console.log("\n");
          console.table(res);
      }
      init()
  });
  
};
//Call for Add A Department.
function addNewDepartment() {
  inquirer.prompt({
      type: 'input',
      name: 'addNewDepartment',
      message: 'What department would you like to add?'
      }).then(({ addNewDepartment }) => {
      const sql = `INSERT INTO departments (dept_name)
                  VALUES (?)`;
      const params = [addNewDepartment]
      db.query(sql, params, err => {
          if (err) {
              throw err;
          } else {
              getAllDepartments();
          };
      });

  
  });
};
//Call for Add A Role.
async function addNewRole() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'title',
          message: 'What role would you like to add?'
      },
      {
          type: 'input',
          name: 'salary',
          message: 'What is the salary for the role?'
      },
      {
          type: 'input',
          name: 'department_id',
          message: 'What is the department_id of the role?'
      }

  ]).then(({ title, salary, department_id }) => {
      const sql = `INSERT INTO roles (title, salary, department_id)
                  VALUES (?,?,?)`;
      const params = [title, salary, department_id];
      db.query(sql, params, async(err) => {
          if (err) {
              throw err;
          } else {
              await getAllRoles();
          };
      });
  });
};
//Call for Add An Employee.
async function addNewEmployee() {
  inquirer.prompt([
      {
          type: 'input',
          name: 'first_name',
          message: "What is the new employee's first name?"
      },
      {
          type: 'input',
          name: 'last_name',
          message: "What is the new employee's last name?"
      },
      {
          type: 'input',
          name: 'role_id',
          message: "What is the new employee's role ID?"
      },
      {
          type: 'input',
          name: 'manager_id',
          message: "Who is the new employee's manager ID?"
      }
  ]).then(({ first_name, last_name, role_id, manager_id }) => {
      const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                  VALUES (?,?,?,?)`;
      const params = [first_name, last_name, role_id, manager_id];
      db.query(sql, params, async(err) => {
          if (err) {
              throw err;
          } else {
              await getAllEmployees();
          }
          
      });

  
  });
};

//Call for Update An Employee Role.
// function updateEmployeeRole() {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'chooseEmployee',
//             message: 'Choose an employee to update their role'
//         },
//         {
//             type: 'input',
//             name: 'updateRole',
//             message: 'What role do you want to update this employee to?'
//         }
//     ]).then(({ chooseEmployee, updateRole }) => {
//         const sql = `UPDATE employees SET role_id = ? WHERE id = ?`;
//         const params = [chooseEmployee, updateRole];
//         db.query(sql, params, err => {
//             if (err) {
//                 throw err
//             } else {
//                 getAllEmployees();
//             }
//         });
//     init();
//     });
// };

init();
})}