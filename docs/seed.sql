USE employee_cms;

INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("QA");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Executive");

INSERT INTO role (title,salary,department_id) VALUES ("Software Engineer",101000,(SELECT id FROM department WHERE name = "Engineering"));
INSERT INTO role (title,salary,department_id) VALUES ("Hardware Engineer",102000,(SELECT id FROM department WHERE name = "Engineering"));
INSERT INTO role (title,salary,department_id) VALUES ("Software Manager",121000,(SELECT id FROM department WHERE name = "Engineering"));
INSERT INTO role (title,salary,department_id) VALUES ("Hardware Manager",122000,(SELECT id FROM department WHERE name = "Engineering"));
INSERT INTO role (title,salary,department_id) VALUES ("QA Engineer",103000,(SELECT id FROM department WHERE name = "QA"));
INSERT INTO role (title,salary,department_id) VALUES ("Salesperson",104000,(SELECT id FROM department WHERE name = "Sales"));
INSERT INTO role (title,salary,department_id) VALUES ("Sales Lead",123000,(SELECT id FROM department WHERE name = "Sales"));
INSERT INTO role (title,salary,department_id) VALUES ("Accountant",105000,(SELECT id FROM department WHERE name = "Finance"));
INSERT INTO role (title,salary,department_id) VALUES ("Lawyer",106000,(SELECT id FROM department WHERE name = "Legal"));
INSERT INTO role (title,salary,department_id) VALUES ("Legal Team Lead",124000,(SELECT id FROM department WHERE name = "Legal"));
INSERT INTO role (title,salary,department_id) VALUES ("CFO",151000,(SELECT id FROM department WHERE NAME = "Executive"));
INSERT INTO role (title,salary,department_id) VALUES ("VP Engineering",152000,(SELECT id FROM department WHERE name = "Executive"));
INSERT INTO role (title,salary,department_id) VALUES ("VP Sales",153000,(SELECT id FROM department WHERE name = "Executive"));

INSERT INTO employee (first_name,last_name,role_id) VALUES ("John","Doe",(SELECT id FROM role WHERE title = "Sales Lead"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Mike","Chan",(SELECT id FROM role WHERE title = "Salesperson"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Ashley","Roman",(SELECT id FROM role WHERE title = "Software Manager"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Kevin","Ali",(SELECT id FROM role WHERE title = "Software Engineer"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Malia","Brown",(SELECT id FROM role WHERE title = "Accountant"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Sarah","Li",(SELECT id FROM role WHERE title = "Legal Team Lead"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Tom","Allen",(SELECT id FROM role WHERE title = "Lawyer"));
INSERT INTO employee (first_name,last_name,role_id) VALUES ("Christian","Stone",(SELECT id FROM role WHERE title = "Hardware Engineer"));

-- Update employee table to add managers
SELECT @manager_id:=id FROM employee WHERE first_name="John" AND last_name="Doe";
UPDATE employee SET manager_id=@manager_id WHERE first_name="Mike" AND last_name="Chan";
SELECT @manager_id:=id FROM employee WHERE first_name="Ashley" AND last_name="Roman";
UPDATE employee SET manager_id=@manager_id WHERE first_name="Kevin" AND last_name="Ali";
SELECT @manager_id:=id FROM employee WHERE first_name="Sarah" AND last_name="Li";
UPDATE employee SET manager_id=@manager_id WHERE first_name="Tom" AND last_name="Allen";

-- SELECT * FROM role;
-- SELECT * FROM department;
-- SELECT * FROM employee;