const inquirer = require('inquirer');
const orm = require('./orm');
const cTable = require('console.table');

let employeeList, managerList, roleList, departmentList;

async function genEmployeeList() {
  let result = await orm.getEmployeesRaw();
  employeeList = result.map( e => ({ name: `${e.first_name} ${e.last_name}`, value: e.id }) );
  //console.log('[genEmployeeList]', employeeList);
}

async function genRoleList() {
  let result = await orm.getRolesRaw();
  roleList = result.map( r => ({ name: r.title, value: r.id }) );
  //console.log('[genRoleList]', roleList);
}

async function genDepartmentList() {
  let result = await orm.getDepartmentsRaw();
  departmentList = result.map( d => ({ name: d.name, value: d.id }) );
  //console.log('[genDepartmentList]', departmentList);
}

function genManagerList(excludeId='') {
  // console.log('[genManagerList]', excludeId);
  if (excludeId) {
    managerList = employeeList.filter( e => e.value != excludeId );
  } else {
    managerList = employeeList.concat();
  }
  // Add 'none' option
  managerList.push( { name: 'None', value: null } );
}

function doAddEmployeePrompts() {
  const questions = [
    {
      name: 'firstName',
      message: "Enter employee's first name:"
    },
    {
      name: 'lastName',
      message: "Enter employee's last name:"
    },
    {
      type: 'list',
      name: 'roleId',
      message: "Select the employee's role:",
      choices: roleList
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Select the employee's manager:",
      choices: function(answers) {
        genManagerList();
        return managerList;
      }
    }
  ];
  return inquirer.prompt(questions);
}

function doRemoveEmployeePrompts() {
  const questions = [
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select employee to remove:',
      choices: employeeList
    }
  ];
  return inquirer.prompt(questions);
}

function doUpdateEmployeeRolePrompts() {
  const questions = [
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select employee to update:',
      choices: employeeList
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select role:',
      choices: roleList
    }
  ];
  return inquirer.prompt(questions);
}

function doUpdateEmployeeManagerPrompts() {
  const questions = [
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select employee to update:',
      choices: employeeList
    },
    {
      type: 'list',
      name: 'managerId',
      message: "Select employee's manager:",
      choices: function(answers) {
        // console.log('[emp]', answers);
        genManagerList(answers.employeeId);
        return managerList;
      }
    }
  ];
  return inquirer.prompt(questions);
}

function doAddRolePrompts() {
  const questions = [
    {
      name: 'title',
      message: 'Enter new role:'
    },
    {
      type: 'number',
      name: 'salary',
      message: 'Enter salary for role:'
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select department:',
      choices: departmentList
    }
  ];
  return inquirer.prompt(questions);
}

function doRemoveRolePrompts() {
  const questions = [
    {
      type: 'list',
      name: 'roleId',
      message: 'Select role to remove:',
      choices: roleList
    }
  ];
  return inquirer.prompt(questions);
}

function doAddDepartmentPrompts() {
  const questions = [
    {
      name: 'name',
      message: 'Enter new department:'
    }
  ];
  return inquirer.prompt(questions);
}

function doRemoveDepartmentPrompts() {
  const questions = [
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select department to remove:',
      choices: departmentList
    }
  ];
  return inquirer.prompt(questions);
}

(async ()=>{
  let result, response;
  // Init
  genEmployeeList();
  genRoleList();
  genDepartmentList();
  console.log("*** EMPLOYEE CONTENT MANAGEMENT SYSTEM***");

  // Infinite loop through options
  const userOptions = [{
    type: 'list',
    name: 'op',
    message: 'Select an option:',
    choices: ['View All Employees','View All Employees by Department','View Employees by Manager',
      'Add Employee','Remove Employee','Update Employee Role','Update Employee Manager',
      'View All Roles','Add Role','Remove Role','View All Departments','Add Department',
      'Remove Department','View Total Budget by Department','Exit'
    ]
  }];
  let continueFlag = 1;
  while (continueFlag) {
    let sel = await inquirer.prompt(userOptions);
    switch(sel.op) {
      case 'View All Employees':
        result = await orm.getEmployeesFormatted();
        console.table(result);
        break;
      case 'View All Employees by Department':
        result = await orm.getEmployeesFormattedByDepartment();
        console.table(result);
        break;
      case 'View Employees by Manager':
        result = await orm.getEmployeesFormattedByManager();
        console.table(result);
        break;
      case 'Add Employee':
        response = await doAddEmployeePrompts();
        result = await orm.addEmployee(response.firstName, response.lastName, 
                                   response.roleId, response.managerId);
        console.log("*** Employee Added! ***");
        // Update list of employees
        genEmployeeList();
        break;
      case 'Remove Employee':
        response = await doRemoveEmployeePrompts();
        result = await orm.removeEmployee(response.employeeId);
        console.log("*** Employee Removed! ***");
        // Update list of employees
        genEmployeeList();        
        break;
      case 'Update Employee Role':
        response = await doUpdateEmployeeRolePrompts();
        result = await orm.updateEmployeeRole(response.employeeId, response.roleId);
        console.log("*** Employee's Role Updated! ***");
        break;
      case 'Update Employee Manager':
        response = await doUpdateEmployeeManagerPrompts();
        result = await orm.updateEmployeeManager(response.employeeId, response.managerId); 
        console.log("*** Employee's Manager Updated! ***");
        break;
      case 'View All Roles':
        result = await orm.getRolesFormatted();
        console.table(result);
        break;
      case 'Add Role':
        response = await doAddRolePrompts();
        result = await orm.addRole(response.title, response.salary, response.departmentId);
        console.log("*** Role Added! ***");
        // Update list of roles
        genRoleList();              
        break;
      case 'Remove Role':
        response = await doRemoveRolePrompts();
        result = await orm.removeRole(response.roleId);
        console.log("*** Role Removed! ***");
        // Update list of roles
        genRoleList();          
        break;
      case 'View All Departments':
        result = await orm.getDepartmentsFormatted();
        console.table(result);
        break;
      case 'Add Department':
        response = await doAddDepartmentPrompts();
        result = await orm.addDepartment(response.name);
        console.log("*** Department Added! ***");
        // Update list of departments
        genDepartmentList();     
        break;
      case 'Remove Department':
        response = await doRemoveDepartmentPrompts();
        result = await orm.removeDepartment(response.departmentId);
        console.log("*** Department Removed! ***");
        // Update list of departments
        genDepartmentList();             
        break;
      case 'View Total Budget by Department':
        result = await  orm.getBudgetByDepartment();
        console.table(result);
        break;
      case 'Exit':
        continueFlag = 0;
        break;
    }
  }
  await orm.closeORM();
})();
