const inquirer = require('inquirer');
const mysql = require('mysql2');


const connection = mysql.createConnection(
{
 PORT : process.env.PORT || 3000
})


  // Connect to database
 const db = mysql.createConnection;(
  {
    host: 'localhost',
    user: 'root',
    password: 'BlueCord#1',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
 );

connection.connect((err) => {
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
  
    

// view all employees function
function viewEmployee() {
  const sql = `
  SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
  FROM employee
  LEFT JOIN employee manager on manager.id = employee.manager_id
  INNER JOIN role ON (role.id = employee.role_id)
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY employee.id;
  `
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    
    mainMenu();
  })
};

// function to add the newly created department to the department table
function insertDepartment({ departmentName }) {
  const sql = `
INSERT INTO department (name)
VALUES (?)
`
  const params = departmentName;
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log("Successfully added ", departmentName);
    mainMenu();
  });
};

// function to create a new department
function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      name: "departmentName",
      message: "Whats the name of the new department?"
    }
  ])
    .then((answer) => {
      insertDepartment(answer);
    })
};

// function to add an employee, their role, and their manager
function addEmployeeRole(roles) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeFirstName",
        message: "What's the employees first name?"
      },
      {
        type: "input",
        name: "employeeLastName",
        message: "What's the employees last name?"
      },
      {
        type: "list",
        name: "employeeRole",
        message: "What's the employees role",
        choices: roles
      },
      {
        type: "list",
        name: "employeeManager",
        message: "Who is this employees manager?",
        choices: [
          "Beth Davila",
          "Deacon Cline",
          "Kayleigh Combs",
          "Matthew Sanford",
          "Wanda Roberson",
          "NULL"
        ]
      },
    ])
    .then((answer) => {
      const sql = `
      INSERT INTO employee SET ?
    `
      db.query(sql, {
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName,
        role_id: answer.employeeRole,
        manager_id: answer.manager_id,
      },
        (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          
          console.log("Successfully added employee");
          mainMenu();
        })
    })
};

// function to get the roles from the role table and map them into an array
function addEmployee() {
  const sql = `
  SELECT role.id, role.title
  FROM role;
  `
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    const roles = result.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    
    addEmployeeRole(roles);
  })
}

// function to get the employees from the employee table and map them into an array
function updateEmployeeRole() {
  const sql = `
  SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee
  FROM employee;
  `
  db.query(sql, (err, result) => {
    if (err) {
      result.status(400).json({ error: err.message });
      return;
    }
    const employees = result.map(({ id, employee }) => ({
      name: employee,
      value: id
    }));
    console.error(err);
    
    employeeRoles(employees);
  });
};

// function to get the roles from the role table and map them into an array
function employeeRoles(employees) {
  const sql = `
  SELECT role.id, role.title
  FROM role;
  `
  let roles;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    roles = result.map(({ id, title }) => ({
      name: title,
      value: id
    }));
    

    updatePrompt(employees, roles);
  });
};

// function to update a selected employees role
function updatePrompt(employees, roles) {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employeeOptions",
        message: "Select an employee to update",
        choices: employees
      },
      {
        type: "list",
        name: "roleOptions",
        message: "What role would you like to assign to the employee?",
        choices: roles
      },
    ])
    .then((answer) => {
      const sql = `
      UPDATE employee SET role_id = ? WHERE id = ?;
      `
      db.query(sql,
        [
          answer.roleOptions,
          answer.employeeOptions
        ],
        (err, result) => {
          if (err) {
            res.status(400).json({ error: err.message });
            return;
          }
          
          console.log("Employees role successfully updated");
          mainMenu();
        }
      );
    });
  };
