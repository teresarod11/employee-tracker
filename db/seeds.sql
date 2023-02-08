INSERT INTO department (name)
VALUES ('Sales'),
       ('Sales'),
       ('Engineering'),
       ('Engineering'),
       ('Finance'),
       ('Finance'),
       ('Legal'),
       ('Legal');

INSERT INTO role (title, salary, manager_id)
VALUES ('Sales Lead', 100000.00 ),
       ('Salesperson', 80000.00, 1 ),
       ('Lead Engineer', 150000.00 ),
       ('Software Engineer', 120000.00, 3 ),
       ('Account Manager', 160000.00 ),
       ('Accountant', 125000.00, 5 ),
       ('Legal Team Lead', 250000.00 ),
       ('Lawyer', 190000.00, 7 );

INSERT INTO employee (first_name, last_name)
VALUES ('John', 'Doe' ),
       ('Mike', 'Chan' ),
       ('Ashley', 'Rodriguez' ),
       ('Kevin', 'Tupik' ),
       ('Kunal', 'Singh' ),
       ('Malia', 'Brown' ),
       ('Sarah', 'Lourd' ),
       ('Tom', 'Allen' );