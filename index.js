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
    const sql = `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`
    db.query(sql, (err, result, ) => {
        if (err) throw err;
        console.log(result);
    });
});

function main(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ])
    .then((answers) => {
        if (answers.choice === 'View All Employees'){
            db.query(`SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`, (err, result) => {
                console.table(result);
                main()
            })
        } else if (answers.choice === 'View All Roles'){
            db.query(`SELECT * FROM role`, (err, result) => {
                console.table(result);
                main()
            })
        } else if (answers.choice === 'View All Departments'){
            db.query(`SELECT * FROM department`, (err, result) => {
                console.table(result);
                main()
            })
        } else if (answers.choice === 'Add Employee'){
            addEmployee()
        } else if (answers.choice === 'Update Employee Role'){
            updateRole()
        } else if (answers.choice === 'Add Role'){
            addRoles()
        }  else {
            addDepartment()
        }
    })
}
