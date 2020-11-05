const inquirer = require('inquirer');
const orm = require('./orm');
const cTable = require('console.table');

let employeeList, managerList, roleList, departmentList;

async function getEmployeeList() {
  let result = await orm.getEmployeesRaw();
  employeeList = result.map( e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }) );
  //console.log('[getEmployeeList]', employeeList);
}

async function getRoleList() {
  let result = await orm.getRolesRaw();
  roleList = result.map( r => ({ name: r.title, value: r.id }) );
  //console.log('[getRoleList]', roleList);
}

async function getDepartmentList() {
  let result = await orm.getDepartmentsRaw();
  departmentList = result.map( d => ({ name: d.name, value: d.id }) );
  //console.log('[getDepartmentList]', departmentList);
}

(async ()=>{
  // Init
  getEmployeeList();
  getRoleList();
  getDepartmentList();
  console.log("*** EMPLOYEE CONTENT MANAGEMENT SYSTEM***");

  // Infinite loop through options
  const userOptions = {
    type: 'list',
    name: 'op',
    message: 'Select an option:',
    choices: ['View All Employees','View All Employees by Department','View All Employees by Manager',
      'Add Employee','Remove Employee','Update Employee Role','Update Employee Manager',
      'View All Roles','Add Role','Remove Role','View All Departments','Add Department',
      'Remove Department','View Total Budget by Department','Exit'
    ]
  }
  let continueFlag = 1;
  while (continueFlag) {
    let sel = await inquirer.prompt(userOptions);
    switch(sel.op) {
      case 'Exit':
        continueFlag = 0;
        break;
    }
  }
  await orm.closeORM();
})();
