//This is going to be a node we are going to import to index.js and it will handle all of our SQL commands and requests. 
const mysql = require('mysql2');
const cTable = require('console.table');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Roserise123!',
        database: "company_db"
    }
);

// We created a connection with the database with sql. And now we are going to 
//create functions that bring everything together. 3 adds, 3 displays, 3 gets.
function displayDepartments() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM department;", (error, result) => {
            if (error) {
                reject(error);
            }
            console.table(result);
            resolve();   //resolve means it worked. 
        })
    })
}

function displayEmployees() {
    return new Promise((resolve, reject) => {
        db.query("SELECT employee.id,employee.first_name,employee.last_name,role.title,department.name AS department, role.salary,CONCAT(manager.first_name,' ',manager.last_name ) AS manager, manager.first_name AS m,employee.manager_id FROM employee LEFT JOIN role ON employee.role_id=role.id  LEFT JOIN employee manager ON manager.id=employee.manager_id LEFT JOIN department ON role.department_id=department.id ;", (error, result) => {
            if (error) {
                reject(error);
            }
            console.table(result);
            resolve();
        })
    })
}

//display roles 
function displayRole() {
    return new Promise((resolve, reject) => {
        db.query("SELECT role.id,role.title, department.name AS department,role.salary FROM role LEFT JOIN department ON role.department_id = department.id", (error, result) => {
            if (error) {
                reject(error);
            }
            console.table(result);
            resolve();
        })

    })
}
/// AS will change the name of whatever variable you made of the collumn.


function addEmployee(first_name, last_name, roleName, managerName) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM role WHERE title="${roleName}"`, (error, result) => {
            if (error) {
                reject(error);
            }
            var role_id = result[0].id;

            db.query(`SELECT id FROM employee WHERE CONCAT (first_name," ",last_name)="${managerName}"`, (error, result) => {
                if (error) {
                    reject(error);
                }
                var manager_id = result[0].id;
                db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES ("${first_name}","${last_name}",${role_id},${manager_id})`, (error, result) => {
                    if (error) {
                        reject(error);

                    }
                    console.log(`Added ${first_name +" "+ last_name} to database`)
                    resolve();
                })
            })

        })
    })
}
 //base it off line 55 and below!    DO THIS DO THIS DO THIS DO THIS ISAAC FUCKING PARK 
 //find the row, and gets the numner id. 85..// 
 //
function updateEmployeeRole(employee,newRole){
    return new Promise((resolve, reject) => {
        db.query(`SELECT id FROM role WHERE title="${newRole}"`,(error,result)=>{
            if(error){ 
                reject(error);
            } //ALL SQL COMMANDS //SETTING //GRABBING
            db.query(`UPDATE employee SET role_id = ${result[0].id} WHERE CONCAT(first_name," ",last_name)="${employee}"`,(error,results)=>
            {
                if (error){
                    reject(error);
                }
            console.log("updated employee role")
            resolve();//resolve ends a promise. we are done asynchronously coding. 

            })
        })
//WHERE ONLY EDITS A CERTAIN ROW IN THE TABLE. ONLY IF THAT ROW MEETS A CONDITION. 
    })
}

function addRole(title, salary, departmentName) {
    return new Promise((resolve, reject) =>
        db.query(`SELECT id FROM department WHERE name="${departmentName}"`, (error, result) => {
            if (error) {
                reject(error);
            }
            var department_id = result[0].id;
            db.query(`INSERT INTO ROLE(title,salary,department_id) VALUES ("${title}","${salary}",${department_id})`, (error, result) => {
                if (error) {
                    reject(error);
                }
                console.log(`Added ${title} to roles`);
                resolve();
            })
        }))
}

//concat is going to add stuff together, sql command
//template literal, your grabbing the literal string




function addDepartment(name) {
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO department(name) VALUES ("${name}")`, (error, result) => {
            if (error) {
                reject(error);
            }
            console.log('added department')
            resolve();


        })
    })
    //we want the compter to do things asynchronously first so we use promises. 
    //concat adds things together
}
function getDepartmentNames() {
    return new Promise((resolve, reject) => {
        db.query({ sql: 'SELECT JSON_ARRAYAGG(name) AS name FROM department;', rowAsArray: true }, (error, result) => {
            if (error) {
                reject(error);

            }
            resolve(result[0].name)
        })
    })
}
function getEmployeeNames() {
    return new Promise((resolve, reject) => {
        db.query({ sql: 'SELECT JSON_ARRAYAGG(CONCAT(first_name," ",last_name)) AS name FROM employee;', rowAsArray: true }, (error, result) => {
            if (error) {
                reject(error);

            }
            resolve(result[0].name)
        })
    })
}

function getRoleNames() {
    return new Promise((resolve, reject) => {
        db.query({ sql: 'SELECT JSON_ARRAYAGG(title) AS title FROM role;', rowAsArray: true }, (error, result) => {
            if (error) {
                reject(error);

            }
            resolve(result[0].title)
        })
    })
}

module.exports = { updateEmployeeRole, displayDepartments, displayEmployees, displayRole, addEmployee, addDepartment, addRole, getDepartmentNames, getEmployeeNames, getRoleNames };




