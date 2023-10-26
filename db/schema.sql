DROP DATABASE if EXISTS workers_db;
CREATE DATABASE workers_db;
use workers_db;
CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(9,2) NOT NULL,
    department_id INT,
    Foreign Key (department_id) REFERENCES department(id) on delete set NULL
);
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT ,
    manager_id INT,
    Foreign Key (role_id) REFERENCES role(id) on delete set NULL,
    Foreign Key (manager_id) REFERENCES employee(id) on delete set NULL
);
SOURCE db/seeds.sql;
SOURCE db/queries.sql;