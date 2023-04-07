const inquirer = require('inquirer');
const sqlHelper = require("./helpers/sqlHelper.js");

const menuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'menuOption',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit']
        //type displays the type of question. other ex is display list. 
    }

]
const newEmployeeQuestions = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'lastName'
    },
]


const newDepartmentQuestions = [
    {
        type: 'input',
        message: "What is the name of the department?",
        name: 'departmentName'
    }
]
const newRoleQuestions = [
    {
        type: 'input',
        message: "What is the name of your role?",
        name: 'roleName'
    },
    {
        type: 'input',
        message: "What is the salary of your role?",
        name: 'roleSalary'
    },

]
//Everything we put in here, on like 74 is what happens after the questions.
function menu() {
    inquirer.prompt(menuQuestions).then((data) => {
        switch (data.menuOption) {
            case 'View All Employees':
                sqlHelper.displayEmployees().then(() => {
                    menu();
                })
                break;
            case 'Add Employee':
                newEmployee();
                break;
            case 'Update Employee Role':
                updateEmployee();
                break;
            case 'View All Roles':
                sqlHelper.displayRole().then(() => {
                    menu();
                })
                break;
            case 'Add Role':
                newRole();
                break;
            case 'View All Departments':
                sqlHelper.displayDepartments().then(() => {
                    menu();
                })
                break;
            case 'Add Department':
                newDepartment();

                break;
        }
    })
}
function newDepartment() {
    inquirer.prompt(newDepartmentQuestions).then((data) => {
        sqlHelper.addDepartment(data.departmentName).then(() => {
            menu();
        })
    })
}
function newRole() {
    sqlHelper.getDepartmentNames().then((depList) => {
        newRoleQuestions.push(
            {
                type: 'list',
                message: "What department does the role belong to?",
                name: "roleDepartment",
                choices: depList
            }
        )
        inquirer.prompt(newRoleQuestions).then((answers) => {
            sqlHelper.addRole(answers.roleName, answers.roleSalary, answers.roleDepartment).then(() => menu())
        })
    })

}

function newEmployee() {
    sqlHelper.getRoleNames().then((roleList) => {
        sqlHelper.getEmployeeNames().then((empList) => {
            newEmployeeQuestions.push(
                {
                    type: 'list',
                    message: "What is the employee's role?",
                    name: 'role',
                    choices: roleList
                },
                {
                    type: 'list',
                    message: "Who is the employee's manager?",
                    name: 'manager',
                    choices: empList
                }
            )
            inquirer.prompt(newEmployeeQuestions).then((answers) => {
                sqlHelper.addEmployee(answers.firstName, answers.lastName, answers.role, answers.manager).then(() => menu())
            })

        })
    })
}
function updateEmployee(){
    sqlHelper.getEmployeeNames().then((empList)=>{
        sqlHelper.getRoleNames().then((roleList)=>{
            var updateEmployeeQuestions=[{
                type: 'list',
                message: "Which employee would you like to update?",
                name: 'updatedEmployee',
                choices: empList
            },
            {
                type: 'list',
                message: "What is this employee's role?",
                name: 'employeeRole',
                choices: roleList
            }
        ]
        inquirer.prompt(updateEmployeeQuestions).then((answers)=>{
            sqlHelper.updateEmployeeRole(answers.updatedEmployee,answers.employeeRole).then(()=> menu())
        })
        })
    })
}



menu();

