# Employee_Content_Management_System
This project is a node application for managing information about a company's employees, job roles, and departments. The project is written in javascript. The inquirer and mysql modules are also used.

## The Database
A user can use the application to Create, Read, Update, and Delete information about employees, job roles, and departments. The application talks with a local mysql database containing three tables with the properties shown in diagram.

![database schema](readme/schema.png)

By performing `LEFT JOIN`s on the tables, the data can be combined to provide meaningful answers to various queries. 

## Usage
The application requires a local mysql server. 

schema.sql and seed.sql in the docs/ folder can be used to create and seed the database.

Run `npm install` to install the required packages. 

Create and set the environment variable `SQL_PSWD` to your database password.

Type `node index.js` to run the application.

You'll be prompted to select one of the following operations.
* View All Employees
* View All Employees by Department
* View All Employees by Manager
* Add Employee
* Remove Employee
* Update Employee Role
* Update Employee Manager
* View All Roles
* Add Role
* Remove Role
* View All Departments
* Add Department
* Remove Department
* View Total Budget by Department
* Exit

![screenshot of application](readme/screenshot_of_employee_cms.png)

A video of the application in action can be viewed [here]().