-- SEEDS FOR TEST EMPLOYEES / MANAGERS --
use employees;

INSERT INTO department
    (name)
VALUES
    ("Human Resources"),
    ("Administrative"),
    ("Marketing"),
    ("Information Technology");

INSERT INTO role
    (title, salary, department_id)
VALUES
    ("HR Manager", 100000, 1),
    ("HR Representative", 85000, 1),
    ("Administrative Director", 100000, 2)
    ("Administrative Support", 85000, 2)
    ("Marketing Director", 100000, 3),
    ("Sales Lead", 90000, 3),
    ("Customer Representative", 75000, 3),
    ("IT Director", 100000, 4),
    ("IT Lead", 95000, 4),
    ("Network Support Engineer", 90000, 4);
    ("Deskside Support Engineer", 85000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("Marguerita", "Sage", 1, NULL),
    ("Rosalina," "Trapp", 2, NULL),
    ("Russ", "Rock", 3, NULL),
    ("Rory", "Ocampo", 2, 1),
    ("Vikki", "Von-Hook", 2, 2),
    ("Deja", "Cuevas", 4, 3),
    ("Derek", "Lemon", 4, 3);