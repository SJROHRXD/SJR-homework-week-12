INSERT INTO department
    (name)
VALUES
    ('Human Resources'),
    ('Marketing'),
    ('Information Technology'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 100000, 1),
    ('HR', 50000, 1),
    ('Marketing Director', 140000, 2),
    ('Sales', 65000, 2),
    ('IT Director', 195000, 3),
    ('Desktop Support', 100000, 3),
    ('Account Manager', 110000, 4),
    ('Accountant', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jackie', 'Petit', 1, NULL),
    ('Max', 'Gonzales', 2, 1),
    ('Calvin', 'Kim', 3, NULL),
    ('Yukata', 'Mikoto', 4, 3),
    ('Maria', 'Longwood', 4, 3),
    ('Sheri', 'Green', 5, NULL),
    ('Jonathan', 'Prune', 6, 5),
    ('Andrew', 'Romans', 6, 5),
    ('Julius', 'Thomas', 7, NULL),
    ('Sari', 'Rasa', 7, 8);