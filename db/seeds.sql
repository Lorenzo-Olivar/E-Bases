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
("Sarah", "Haras", 2, 1),
("Mike", "Ekim", 3, null),
("Julie", "Eiluj", 4, 3),
("Michelle", "Ellehcim", 5, null),
("Katie", "Eitak", 6, 5),
("Lamar", "Ramal", 7, null),
("Jake", "Ekaj", 8, 7);