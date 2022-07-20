const inquirer = require('inquirer');
const db = require('./db/connection');

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
    .then(({ action }) => {
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
          .prompt(
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
        // Get dept array for inquirer choices
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          const deptArray = rows.map(obj => { return { value: obj.id, name: obj.dept_name }; });

          inquirer
            .prompt([
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
                type: 'list',
                name: 'dept',
                message: 'Which department does the role belong to?',
                choices: deptArray
              }
            ])
            .then(answers => {
              addRole(answers);
            })
        })
      } else if (action === 'Add an employee') {
        // Get role Array for inquirer choices
        let sql = `SELECT id, job_title FROM roles`;
        db.query(sql, (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
            return;
          }
          const roleArray = rows.map(obj => { return { value: obj.id, name: obj.job_title } })

          // Get manager array for inqirer choices from employee table
          let sql = `SELECT id, first_name, last_name FROM employees`;
          db.query(sql, (err, rows) => {
            if (err) {
              res.status(500).json({ error: err.message });
              return;
            }
            const managerArray = rows.map(obj => { return { value: obj.id, name: (obj.first_name + ' ' + obj.last_name) } });

            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'first_name',
                  message: 'What is the employee\'s first name?'
                },
                {
                  type: 'input',
                  name: 'last_name',
                  message: "What is the employee\'s last name?"
                },
                {
                  type: 'list',
                  name: 'role',
                  message: 'What is the employee\'s role',
                  choices: roleArray
                },
                {
                  type: 'list',
                  name: 'manager',
                  message: 'Who is the employee\'s manager?',
                  choices: managerArray
                }
              ])
              .then(answers => {
                addEmployee(answers);
              })
          })
        })
      } else if (action === 'Update an employee\'s role') {
        updateRole();
      } else {
        db.end(function (err) {
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
  const sql = `INSERT INTO roles (job_title, salary, dept_id)
               VALUES (?,?,?)`;
  const params = [answers.role, answers.salary, answers.dept];
  console.log(params);
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log(answers.role + ' role added.');
    menuListPrompt();
  });
};

function addEmployee(empInfo) {
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
              VALUES (?,?,?,?)`;
  const params = [empInfo.first_name, empInfo.last_name, empInfo.role, empInfo.manager];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    console.log('Employee ' + empInfo.first_name + ' ' + empInfo.last_name + ' added.');
    menuListPrompt();
  })
};

function updateRole() {
  // Get employee array for inquirer choices
  let sql = `SELECT id, first_name, last_name FROM employees`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const empArray = rows.map(obj => { return { value: obj.id, name: (obj.first_name + ' ' + obj.last_name) } });
    // Get role array for inquirer choices
    let sql = `SELECT id, job_title FROM roles`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      const roleArray = rows.map(obj => { return { value: obj.id, name: obj.job_title } });

      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employee',
            message: 'Which employee has an updated role?',
            choices: empArray
          },
          {
            type: 'list',
            name: 'new_role',
            message: 'What is the employee\'s new role?',
            choices: roleArray
          }
        ]).then(answers => {
          let sql = `UPDATE employees
                        SET role_id = ${answers.new_role}
                      WHERE id = ${answers.employee}`;
          db.query(sql, (err, result) => {
            if (err) {
              res.status(400).json({ error: err.message });
              return;
            }
            console.log('Role updated');
            menuListPrompt();
          })
        })
    })
  })
};


menuListPrompt();



