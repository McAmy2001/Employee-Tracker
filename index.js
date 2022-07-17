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
                  'View all employees',
                  'Add a department',
                  'Add a role',
                  'Add an employee',
                  'Update an employee\'s role',
                  'End Eployee Tracker session'
                ]
      })
      .then(({action}) => {
        console.log(action);
        if (action === 'View all departments') {
          viewAllDepts();
        } else if (action === 'View all roles') {
          viewAllRoles();
        } else if (action === 'View all employees') {
          viewAllEmployees();
        } else {
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
  const sql = `SELECT * FROM roles`;
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
  const sql = `SELECT * FROM employees`;
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
       return;
      }
      console.table(rows);
      menuListPrompt();
    });
};


menuListPrompt();



