INSERT INTO department (name) 
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");
INSERT INTO role (title, salary, department_id) 
VALUES
("Sales Lead", 100000.00, 1),
("Salesperson", 80000.00, 1),
("Lead Engineer", 150000.00, 2),
("Software  Engineer", 120000.00, 2),
("Account Manager", 160000.00, 3),
("Accountant", 125000.00, 3),
("Legal Team Lead", 250000.00, 4),
("Lawyer", 190000.00, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES
("Evan", "Nave", 1, null),
("Sarah", "Haras", 1, 1),
("Mike", "Ekim", 1, null),
("Julie", "Eiluj", 1, 3),
("Michelle", "Ellehcim", 1, null),
("Katie", "Eitak", 1, 5),
("Lamar", "Ramal", 1, null),
("Jake", "Ekaj", 1, 7);