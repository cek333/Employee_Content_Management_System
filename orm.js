const mysql = require('mysql');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) 
          return reject(err);
        
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) 
          return reject(err);
        
        resolve();
      });
    });
  }
}

// at top INIT DB connection
const db = new Database({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.SQL_PSWD,
  database: "employee_cms"
});

////////////////////////////
// SELECT OPERATIONS
////////////////////////////
function getEmployeesRaw() {
  return db.query("SELECT * FROM employee");
}

function getEmployeesFormatted(condition='') {
  return db.query(`
    SELECT e.id, e.first_name, e.last_name,
      r.title, d.name AS department, r.salary, 
      CONCAT(m.first_name," ",m.last_name) AS manager 
    FROM employee e LEFT JOIN employee m ON e.manager_id = m.id
                    LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    ${condition}
  `);
}

function getEmployeesFormattedByDepartment() {
  return getEmployeesFormatted('ORDER BY department');
}

function getEmployeesFormattedByManager() {
  return getEmployeesFormatted('WHERE e.manager_id IS NOT NULL ORDER BY manager');
}

function getRolesRaw() {
  return db.query("SELECT * FROM role");
}

function getRolesFormatted() {
  return db.query(`
    SELECT r.id, r.title AS role, r.salary, d.name as department
    FROM role r LEFT JOIN department d ON r.department_id = d.id
  `);
}

function getDepartmentsRaw() {
  return db.query("SELECT * FROM department");
}

function getDepartmentsFormatted() {
  return db.query("SELECT id, name AS department FROM department");
}

function getBudgetByDepartment() {
  return db.query(`
    SELECT d.name AS department, SUM(r.salary) AS budget
    FROM employee e LEFT JOIN role r ON e.role_id = r.id
                    LEFT JOIN department d ON r.department_id = d.id
                    GROUP BY department
  `);
}

////////////////////////////
// INSERT OPERATIONS
////////////////////////////
function addEmployee(firstName, lastName, roleId, managerId) {
  return db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)',
    [firstName, lastName, roleId, managerId]);
}

function addRole(roleName, salary, departmentId) {
  return db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)',
    [roleName, salary, departmentId]);
}

function addDepartment(departmentName) {
  return db.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
}
////////////////////////////
// UPDATE OPERATIONS
////////////////////////////
function updateEmployeeRole(employeeId, newRoleId) {
  return db.query('UPDATE employee SET role_id=? WHERE id=?', [newRoleId, employeeId]);
}

function updateEmployeeManager(employeeId, managerId) {
  return db.query('UPDATE employee SET manager_id=? WHERE id=?', [managerId, employeeId]);
}

////////////////////////////
// DELETE OPERATIONS
////////////////////////////


////////////////////////////
// DB OPERATIONS
////////////////////////////

function closeORM() {
  return db.close()
}

module.exports = {
  getEmployeesRaw,
  getEmployeesFormatted,
  getEmployeesFormattedByDepartment,
  getEmployeesFormattedByManager,
  getRolesRaw,
  getRolesFormatted,
  getDepartmentsRaw,
  getDepartmentsFormatted,
  getBudgetByDepartment,
  addEmployee,
  addRole,
  addDepartment,
  updateEmployeeRole,
  updateEmployeeManager,
  closeORM
}
