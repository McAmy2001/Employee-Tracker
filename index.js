const inquirer = require('inquirer');
const db = require('./db/connection');
//const viewAllDepts = require('./lib/departments');



const menuListPrompt = () => {
  console.log('Please choose an option from the menu.');
  return inquirer
    .prompt(
      {
        type: 'list',
        name: 'action',
        message: 'Please choose an option from the menu.',
        choices: ['View all departments',
                  'View all roles',
                  'View all employees by ID#',
                  'View all employees by last name',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee\'s role',
                  'End Employee Tracker session'
                ]
      })
      .then(({action}) => {
        console.log(action);
        if (action === 'View all departments') {
          viewAllDepts();
        } else if (action === 'View all roles') {
          viewAllRoles();
        } else if (action === 'View all employees by ID#') {
          viewAllEmployees();
        } else if (action === 'View all employees by last name') {
          empByLastName();
        } else if (action === 'Add a department') {
          return inquirer
            .prompt (
              {
                type: 'input',
                name: 'dept',
                message: 'Name of department to add:'
              })
              .then(answer => {
                let deptToAdd = answer.dept;
                addDept(deptToAdd);
              })
          } else if (action === 'Add a role') {
            let deptArray = getDeptArray();
            console.log(deptArray + 'Here');
            return inquirer
              .prompt ([
                {
                  type: 'input',
                  name: 'role',
                  message: 'Name of role to add:'
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'What is the salary for the role?'
                },
                {
                  type: 'input',
                  name: 'dept',
                  message: 'Which department does the role belong to?'
                }
              ])
                .then(answers => {
                  addRole(answers);
                })
          }
        else {
          db.end(function(err) {
            if (err) {
              return console.log('error:' + err.message);
            }
            console.log('Goodbye, have a great day!');
          });
        }
      });
    };
  
function viewAllDepts() {
  const sql = `SELECT * FROM departments`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.table(rows);
      menuListPrompt();
    });
  };

function viewAllRoles() {
  const sql = `SELECT roles.*, departments.dept_name AS dept_name
                FROM roles
                LEFT JOIN departments ON roles.dept_id = departments.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      console.table(rows);
      menuListPrompt();
    });
};

function viewAllEmployees() {
  const sql = `SELECT e.id, e.first_name, e.last_name, roles.job_title, roles.salary, roles.dept_id, 
                departments.dept_name, m.first_name AS manager_first, m.last_name AS manager_last 
              FROM employees AS e
              LEFT JOIN roles ON e.role_id = roles.id
              LEFT JOIN departments ON roles.dept_id = departments.id
              LEFT JOIN employees AS m ON e.manager_id = m.id`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
       return;
      }
      console.table(rows);
      menuListPrompt();
    });
};

function empByLastName() {
  const sql = `SELECT e.id, e.first_name, e.last_name, roles.job_title, roles.salary, roles.dept_id, 
                m.first_name AS manager_first, m.last_name AS manager_last 
              FROM employees AS e
              LEFT JOIN roles ON e.role_id = roles.id
              LEFT JOIN departments ON roles.dept_id = departments.id
              LEFT JOIN employees AS m ON e.manager_id = m.id
              ORDER BY e.last_name`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
       return;
      }
      console.table(rows);
      menuListPrompt();
    });
};

function addDept(dept) {
  const sql = `INSERT INTO departments (dept_name)
  VALUES (?)`;
  const param = dept;
  db.query(sql, param, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(param + ' added to departments.');
    menuListPrompt();
  });
};

function addRole(answers) {
  console.log(answers.role);
  console.log(answers.salary);
  console.log(answers.dept);
  //const sql = `INSERT INTO roles ()`
  menuListPrompt();
};

function getDeptArray() {
  const sql = `SELECT dept_name FROM departments`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const deptArray = [];
    rows.forEach(function(e) {
      deptArray.push(e.dept_name.value);
    })
    console.log(deptArray);

  })
}

menuListPrompt();



