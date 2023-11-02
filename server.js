// imports
const inquirer = require('inquirer');
const mysql = require('mysql2');
const table = require('console.table');
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
// initial prompt
const initInquire = () => {
    inquirer.prompt(
        [
            {
                type: 'list',
                name: 'feature',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Quit'],
                message: `What would you like to do?`,
            }
        ]
    )
    .then((answers) => {
        switch (answers.feature) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Quit':
                quitPrompt();
                break;
        
            default:
                console.log(`Error server.js line 15`)
                break;
        }
    })
};
initInquire();
// index of prompts
const viewAllEmployees = () => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager_id AS manager FROM employee 
    JOIN role ON employee.role_id = role.id 
    JOIN department ON role.department_id = department.id
    ORDER BY id asc`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
        }
        console.table(rows);
        initInquire();
    });
};
const addEmployee = () => {
    db.query(`SELECT * FROM role`, (err, rows) => {
        if (err) {
            console.error(err);
        }
        const role = rows.map(({id, title}) => ({value: id, name: title}));
        db.query(`SELECT * FROM employee`, (err, rows) => {
            if (err) {
                console.error(err);
            }
            const manager = rows.map(({id, first_name, last_name}) => ({value: id, name: `${first_name}, ${last_name}`}));
            const noManager = {value: null, name: 'none'};
            manager.push(noManager);
            inquirer.prompt([
                {
                    type: "input",
                    name: "firstName",
                    message: `What is the first name of the employee?
                    ->`
                },
                {
                    type: "input",
                    name: "lastName",
                    message: `What is the last name of the employee?
                    ->`
                },
                {
                    type: "list",
                    name: "role",
                    message: `Employee's role?
                    ->`,
                    choices: role
                },
                {
                    type: "list",
                    name: "manager",
                    message: `Employee's manager?
                    ->`,
                    choices: manager
                }
            ]).then((answers) => {
                // console.log(answers);
                const newEmployee = [answers.firstName, answers.lastName, answers.role, answers.manager];
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, newEmployee, (err, rows) => {
                    if (err) {
                       console.error(err); 
                    }
                    console.log(`New Employee Added!`)
                    // console.table(rows);
                    initInquire();
                });
            });
        });
    });
};
const updateEmployee = () => {
    db.query(`SELECT * FROM employee`, (err, rows) => {
        if (err) {
            console.error(err);
        }
        const employees = rows.map(({id, first_name, last_name}) => ({value: id, name: `${first_name} ${last_name}`}));
        db.query(`SELECT * FROM role`, (err, rows) => {
            if (err) {
                console.error(err);
            }
            const role = rows.map(({id, title}) => ({value: id, name: title}));
            inquirer.prompt([
                {
                    type: "list",
                    name: "employee",
                    message: `Which employee's role do you want to update?
                    ->`,
                    choices: employees
                },
                {
                    type: "list",
                    name: "role",
                    message: `Which role do you want for this employee?
                    ->`,
                    choices: role
                }
            ])
            .then((answers) => {
                // console.log(answers);
                const update = [answers.role, answers.employee]
                db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, update, (err) => {
                    if (err) {
                        console.error(err);
                    }
                    console.log(`Employee Updated!`);
                    initInquire();
                });
            });
        });
    });
};
const viewAllRoles = () => {
    const sql = `SELECT role.id, role.title, department.name as department, role.salary FROM role
    JOIN department ON role.department_id = department.id`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
        }
        console.table(rows);
        initInquire();
    });
};
const addRole = () => {
    db.query(`SELECT * FROM department`, (err, rows) => {
        if (err) {
            console.error(err);
        }
        const department = rows.map(({id, name}) => ({value: id, name: name}));
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: `Title of the role?
                ->`
            },
            {
                type: "number",
                name: "salary",
                message: `Salary of the role? (use numbers only)
                ->`
            },
            {
                type: "list",
                name: "department",
                message: `What department?
                ->`,
                choices: department
            }
        ])
        .then((answers) => {
            // console.log(answers);
            const newRole = [answers.title, answers.salary, answers.department];
            db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, newRole, (err) => {
                if (err) {
                   console.error(err); 
                }
                console.log(`New Role Added!`)
                initInquire();
            });
        });
    });
};
const viewAllDepartments = () => {
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, rows) => {
        if (err) {
            console.error(err);
        }
        console.table(rows);
        initInquire();
    });
};
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `Name of the department?
            ->`
        }
    ])
    .then((answers) => {
        // console.log(answers);
        const newDepartment = [answers.name];
        db.query(`INSERT INTO department (name) VALUES (?)`, newDepartment, (err) => {
            if (err) {
                console.error(err); 
            }
            console.log(`New Department Added!`)
            initInquire();
        });
    });
};
const quitPrompt = () => {
    process.exit();
};