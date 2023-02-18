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
// db.connect((err) => {
//     if (err) throw err;
//     // execute main function
//     console.log('Connected!');
//     const sql = `SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`
//     db.query(sql, (err, result, ) => {
//         if (err) throw err;
//         console.log(result);
//     });
// });

const main = [
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
        }
    ]
//     .then((answers) => {
//         if (answers.choice === 'View All Employees'){
//             db.query(`SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`, (err, result) => {
//                 console.table(result);
//                 main()
//             })
//         } else if (answers.choice === 'View All Roles'){
//             db.query(`SELECT * FROM role`, (err, result) => {
//                 console.table(result);
//                 main()
//             })
//         } else if (answers.choice === 'View All Departments'){
//             db.query(`SELECT * FROM department`, (err, result) => {
//                 console.table(result);
//                 main()
//             })
//         } else if (answers.choice === 'Add Employee'){
//             addEmployee()
//         } else if (answers.choice === 'Update Employee Role'){
//             updateRole()
//         } else if (answers.choice === 'Add Role'){
//             addRoles()
//         }  else {
//             addDepartment()
//         }
//     })
// main();

const aEmployee =[
        {
            type: 'input',
            name: 'first',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: ['Salesperson', 'Lead Engineer', 'Software Engineer', 'Account Manager', 'Accountant', 'Legal Team Lead']
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the employees manager?',
            choices: ['John Doe', 'Mike Chan', 'Ashley Rodriguez', 'Kevin Tupik', 'Kunal Singh', ' Malia Brown']
        },
    ]

const uRole = [
        {
            type: 'list',
            name: 'update',
            message: 'What employees role do you want to update?',
            choices: ['Ashley Rodriguez', 'Kevin Tupik',
        'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
        }
    ]

const aRole = [
        {
            type: 'input',
            name: 'role name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'Which department does the role belong to?',
            choices: ['Engineering', 'Finance', 'Legal', 'Sales']
        },
    ];

const aDepartment = [
        {
            type: 'input',
            name: 'depart name',
            message: 'What is the name of the department?'
        }
    ]

    const q = () => {
        return inquirer.prompt(main)
        .then((data) =>{
            switch(data.choice){
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                // View employee
                case 'View Employees':
                    db.query(`SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`);
                    console.table(results[0]);
                    q();
                    break;
                case 'View Roles':
                    db.query(`SELECT * FROM role`, ((err,results) => {
                        if(err){
                            console.log(err);
                        } else { 
                        console.table(results);
                        q();
                        }
                    }));
                    break;
                case 'View Departments':
                    db.query(`SELECT * FROM department`, ((err, results) => {
                        if(err){
                            console.log(err);
                        } else {
                        console.table(results);
                        q();
                        }
                    }));
                    break;
            }
        })
    } 

    const addEmployee = () => {
        return inquirer
        .prompt(aEmployee).then((data) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.first}', '${data.last}', '${data.role}', '${data.manager}')`, (err, results)=> {
             console.log(`You successfully added ${data.first} ${data.last}`)
            });
            q();
        });
    };
q();