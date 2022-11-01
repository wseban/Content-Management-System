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
    db.promise().query("SELECT * FROM department").then(([deptData]) => {
        console.table(deptData);
        startPrompt();
    });
};
const viewRoles = () => {
    db.promise().query("SELECT * FROM role").then(([roleData]) => {
        console.table(roleData);
        startPrompt();
    });
};
const viewEmployees = () => {
    db.promise().query("SELECT * FROM employee").then(([empData]) => {
        console.table(empData);
        startPrompt();
    });
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
                if (deptData.affectedRows > 0) {
                    viewDepts();
                } else {
                    console.info("Employee creation failed, please try again");
                    startPrompt();
                }
            }
            ));

};
const addRole = async () => {
    let [departments] = await db.promise().query("SELECT * FROM department");
    let deptArr = departments.map(({ dept_name, id }) => (
        {
            name: dept_name,
            value: id
        }
    ))
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
                type: "list",
                name: "deptID",
                message: "What department is this role assigned to?",
                choices: deptArr
            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO role(title, salary, department_id)VALUES('${answers.title}', '${answers.salary}', ${answers.deptID});`)
            .then(([roleData]) => {
                if (roleData.affectedRows > 0) {
                    viewRoles();
                } else {
                    console.info("Role creation failed, please try again");
                    startPrompt();
                }
            }
            ));

};
const addEmployee = async () => {
    // establish who the managers list is going to be
    let [employees] = await db.promise().query("SELECT * FROM employee");
    let managerArr = employees.map(({ first_name, last_name, id }) => (
        {
            name: first_name + " " + last_name,
            value: id
        }
    ));
    let [roles] = await db.promise().query("SELECT * FROM role");
    let roleArr = roles.map(({ title, id }) => (
        {
            name: title,
            value: id
        }
    ))
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
                type: "list",
                name: "roleID",
                message: "Select this employee's role?",
                choices: roleArr
            },
            {
                type: "list",
                name: "managerID",
                message: "Who is this employee's supervisor?",
                choices: managerArr
            }
        ])
        .then((answers) => db.promise().query(`INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES('${answers.firstName}', '${answers.lastName}', ${answers.roleID}, ${answers.managerID});`)
            .then(([empData]) => {
                if (empData.affectedRows > 0) {
                    viewEmployees();
                } else {
                    console.info("Employee creation failed, please try again");
                    startPrompt();
                }
            }
            ));

};
const updateRole = async () => {
    // establish employee list
    let [employees] = await db.promise().query("SELECT * FROM employee");
    let employeeArr = employees.map(({ first_name, last_name, id }) => (
        {
            name: first_name + " " + last_name,
            value: id
        }
    ));
    // establish role list
    let [roles] = await db.promise().query("SELECT * FROM role");
    let roleArr = roles.map(({ title, id }) => (
        {
            name: title,
            value: id
        }
    ))
    inquirer
        .prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to update?",
                choices: employeeArr
            },
            {
                type: "list",
                name: "reassignment",
                message: "Which Role would you like to reassign this employee to?",
                choices: roleArr

            }
        ])
        .then(answers => {
            let employeeObj = {
                role_id: answers.reassignment,
            }
            db.promise().query("UPDATE employee SET ? WHERE employee.id=?", [employeeObj, answers.employee]).then(([empData]) => {
                if (empData.affectedRows > 0) {
                    viewEmployees();
                } else {
                    console.info("Employee creation failed, please try again");
                    startPrompt();
                }
            })

        })

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
                choices: ["View all departments", "Add a department", "View all roles", "Add a role", "View all employees", "Add an employee", "Update an employee role", "Quit"]
            }
        ])
        .then((answer) => {
            if (answer.start === "View all departments") {
                viewDepts();
                //function for view all departments
            } else
                if (answer.start === "View all roles") {
                    //function for viewing all roles
                    viewRoles();
                } else
                    if (answer.start === "View all employees") {
                        //function to view all employees
                        viewEmployees();
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
                                        process.exit();
                                    }
        });

};







startPrompt();