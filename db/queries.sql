SELECT * FROM department;
SELECT role.id, role.title, department.name as department, role.salary FROM role
JOIN department ON role.department_id = department.id;
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager_id AS manager FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id
ORDER BY id asc;
/* SELECT * FROM employee;
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zo", "Olivar", 1, NULL);
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, manager_id AS manager FROM employee 
JOIN role ON employee.role_id = role.id 
JOIN department ON role.department_id = department.id
ORDER BY id asc;
SELECT * FROM employee; */
/* UPDATE employee SET role_id = 8 WHERE id = 1;
SELECT * FROM employee; */