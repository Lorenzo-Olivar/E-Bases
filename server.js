// Imports
const inquirer = require('inquirer');
const questions = require('./lib/questions');
const mysql = require('mysql2');
// mysql connection
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'zoes',
        database: 'workers_db',
    },
    console.log('Connected to the database.')
);
// questions
const initInquire = function () {
    inquirer.prompt(questions)
    .then(((answers) => {
        switch (answers.feature) {
            case 'View All Employees':
            const sql = 
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, employee.manager_id as manager FROM employee
            JOIN role ON employee.id = role.id 
            JOIN department ON role.department_id = department.id`;
            feature = db.query(sql, function(err, rows) {
                if (err) {
                    console.error(err);
                }
                console.table(rows);
                return initInquire();
            });
            break;
        case 'Add Employee':
            feature = function () {
                inquirer.prompt(addEmployee)
                .then((answers) => {
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (${answers.firstName}, ?, ?, ?)`, function (err) {
                        console.error(err);
                    });
                })
            }
            break;
        case 'Update Employee Role':
            feature = db.query();
            break;
        case 'View All Roles':
            const sql1 =`SELECT role.id, role.title, department.name as department, role.salary FROM role
            JOIN department ON role.department_id = department.id`;
            feature = db.query(sql1, function(err, rows) {
                if (err) {
                    console.error(err);
                }
                console.table(rows);
                return initInquire();
            });
            break;
        case 'Add Role':
            feature = db.query();
            break;
        case 'View All Departments':
            const slq3 = `SELECT * FROM department`;
            feature = db.query(slq3, function(err, rows) {
                if (err) {
                    console.error(err);
                }
                console.table(rows);
                return initInquire();
            });
            break;
        case 'Add Department':
            feature = db.query();
            break;
        case 'Quit':
            feature = process.exit();
            break;
        default:
            console.error(err);
            console.log('Error: Switch Case undefined at `pickFeature.js`.');
            break;
        }
    }));
};
initInquire();