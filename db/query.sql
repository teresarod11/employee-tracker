SELECT e1.id, e1.first_name, e1.last_name, role.title, department.name AS department, role.salary, CONCAT(e2.first_name, ' ', e2.last_name) AS manager
FROM employee e1
JOIN role
ON e1.role_id = role.id
JOIN department
ON role.department_id = department.id
LEFT JOIN employee e2
ON  e2.id= e1.manager_id

