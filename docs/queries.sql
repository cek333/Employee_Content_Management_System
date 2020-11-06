USE employee_cms;
-- View raw tables
SELECT * FROM employee;
SELECT * FROM department;
SELECT * FROM `role`;
-- Employee Views
SELECT e.id, e.first_name, e.last_name,
  r.title, d.name AS department, r.salary, 
  CONCAT(m.first_name," ",m.last_name) AS manager 
FROM employee e LEFT JOIN employee m ON e.manager_id = m.id
                LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                ;
--                 WHERE e.manager_id IS NOT NULL ORDER BY manager; 
--                 ORDER BY department;
-- Role View
SELECT r.id, r.title AS role, r.salary, d.name as department
FROM role r LEFT JOIN department d ON r.department_id = d.id;
-- Department view
SELECT id, name AS department FROM department;
-- View Total Budget by Department
SELECT d.name AS department, SUM(r.salary) AS budget
FROM employee e LEFT JOIN role r ON e.role_id = r.id
                LEFT JOIN department d ON r.department_id = d.id
                GROUP BY department;
