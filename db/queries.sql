SELECT * FROM department;
SELECT role.id, role.title, department.name as department, role.salary FROM role
JOIN department ON role.department_id = department.id;
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name as department, role.salary, employee.manager_id as manager FROM employee
JOIN role ON employee.id = role.id 
JOIN department ON role.department_id = department.id;