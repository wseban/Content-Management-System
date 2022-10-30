//require al necessary items here which include inquirer and helper functions 
// mysql2 need to be required as well





// write inquirer prompts 
// options: view all dep, view all roles, view all emp, add a department, add a role
// add an employee, update an employee role
// ensure to have "quit" 
inquirer
    .prompt([
        {
            type: "list",
            name: "start",
            message: "What would you like to do?",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "update an employee role", "Quit"]
        }
    ]);