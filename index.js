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
});

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
            name: 'roleId',
            message: 'What is id of the employees role?',
            choices: ['1','2','3','4','5','6','7','8']
        },
        {
            type: 'list',
            name: 'managerId',
            message: 'What is the id of the employees manager?',
            choices: ['1','2','3','4','5','6','7','8']
        },
    ]

const uRole = [
        {
            type: 'list',
            name: 'employee',
            message: 'What employees role do you want to update?',
            choices: ['Ashley Rodriguez', 'Kevin Tupik',
        'Kunal Singh', 'Malia Brown', 'Sarah Lourd', 'Tom Allen']
        },
        {
            type: 'list',
            name: 'roleId',
            message: 'What is the role id that you would like to update the employee to?',
            choices: ['1','2','3','4','5','6','7','8']
        }
    ]

const aRole = [
        {
            type: 'input',
            name: 'role_name',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'list',
            name: 'departmentId',
            message: 'What is the id of the department that the role belongs to?',
            choices: ['1','2','3','4']
        },
    ];

const aDepartment = [
        {
            type: 'input',
            name: 'depart_name',
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
                case 'View All Employees':
                    db.query(`SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager FROM employee e1 JOIN role ON e1.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee e2 ON e2.id= e1.manager_id`, (err, results) =>{
                        if(err){
                            console.error(err);
                        } else {
                            console.table(results); 
                        } 
                        setTimeout(() => {
                            q(); 
                        }, 1000); //wait for 1 sec before calling q()
                       
                    });
                    break;
                case 'View All Roles':
                    db.query(`SELECT * FROM role`, ((err,results) => {
                        if(err){
                            console.log(err);
                        } else { 
                        console.table(results);
                        q();
                        }
                    }));
                    break;
                case 'View All Departments':
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
                if(err){
                    console.log(err);
                } else {
                    console.log(`You successfully added ${data.first} ${data.last}`)
                }
            });
            q();
        });
    };
    const addRole = () => {
        return inquirer
        .prompt(aRole).then((data) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${data.role_name}', '${data.salary}', '${data.department}')`, (err, results)=> {
                if(err){
                    console.log(err);
                } else {
                    console.log(`${data.first} ${data.last} role was successfully updated to ${data.title}`)
                }
            });
            q();
        });
    };
    const updateRole = () => {
        return inquirer
        .prompt(uRole).then((data) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (${data.first},${data.last},'${data.name}')`, (err, results)=> {
                if(err){
                    console.log(err);
                } else {
                    console.log(`${data.first} ${data.last} role was successfully updated to ${data.title}`)
                }
            });
            q();
        });
    };
    const addDepartment = () => {
        return inquirer
        .prompt(aDepartment).then((data) => {
            db.query(`INSERT INTO department (name) VALUES ('${data.depart_name}')`, (err, results)=> {
                if(err){
                    console.log(err);
                } else {
                    console.log(`You successfully added ${data.name}`)
                }
            });
            q();
        });
    };
q();