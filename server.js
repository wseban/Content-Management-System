//require al necessary items here which include inquirer and helper functions 
// mysql2 need to be required as well
const inquirer = require('inquirer');
const mysql = require('mysql2');




const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
);

const viewDepts = () => {
    db.promise().query("SELECT * FROM department").then(([deptData]) => console.table(deptData));
};
const viewRoles = () => {
    db.promise().query("SELECT * FROM role").then(([roleData]) => console.table(roleData));
};
const viewEmployees = () => {
    db.promise().query("SELECT * FROM employee").then(([empData]) => console.table(empData));
};
const addDept = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "department",
                message: "what is the name of this new department?"
            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO department(dept_name)VALUES('${answers.department}');`)
        .then(([deptData]) => {
            console.log("Success the department was added!!")
            console.table(deptData)
        }
        ));

};
const addRole = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "title",
                message: "what is the title you would like to give this role?"
            },
            {
                type: "input",
                name: "salary",
                message: "How much does this role make?"
            },
            {
                type: "input",
                name: "deptID",
                message: "What department is this role assigned to?"
            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO employee(title, salary, department_id)VALUES('${answers.title}', '${answers.salary}', ${answers.deptID});`)
        .then(([roleData]) => {
            console.log("Success the new role was added!!")
            console.table(roleData)
        }
        ));

};
const addEmployee = () => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "what is this employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is this employee's last name?"
            },
            {
                type: "input",
                name: "roleID",
                message: "What is this employees role?"
            },
            {
                type: "input",
                name: "managerID",
                message: "Who is this employee's supervisor?"
            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES('${answers.firstName}', '${answers.lastName}', ${answers.roleID}, ${managerID});`)
        .then(([empData]) => {
            console.log("Success the employee was added!!")
            console.table(empData)
        }
        ));

};
const updateRole = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: //["what is the name of this new department?"]
            },
            {
                type: "list",
                name: "reassignment",
                message: "Which Role would you like to reassign this employee to?",
                choices: 

            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO department(dept_name)VALUES('${answers.department}');`)
        .then(([deptData]) => {
            console.log("Success the department was added!!")
            console.table(deptData)
        }
        ));

};
// write inquirer prompts 
// options: view all dep, view all roles, view all emp, add a department, add a role
// add an employee, update an employee role
// ensure to have "quit" 
const startPrompt = () => {
    inquirer
        .prompt([
            {
                type: "list",
                name: "start",
                message: "What would you like to do?",
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role", "Quit"]
            }
        ])
        .then((answer) => {
            if (answer.start === "View all departments") {
                viewDepts();
                return;
                //function for view all departments
            } else
                if (answer.start === "View all roles") {
                    //function for viewing all roles
                    viewRoles();
                    return;
                } else
                    if (answer.start === "View all employees") {
                        //function to view all employees
                        viewEmployees();
                        return;
                    } else
                        if (answer.start === "Add a department") {
                            //function to add a dept
                            addDept();
                        } else
                            if (answer.start === "Add a role") {
                                //function to add a role
                                addRole();
                            } else
                                if (answer.start === "Add an employee") {
                                    //add an employee function
                                    addEmployee();
                                } else
                                    if (answer.start === "Update an employee role") {
                                        updateRole();
                                    } else {
                                        return;
                                    }
        });

};







startPrompt();