# Content Management System

## Screencastify Link:
https://watch.screencastify.com/v/BoaUauTEDDkInZdWN5ya

## Usage
Using the command line the user should first run an "npm i" to download all dependencies for this application.  To start the application the user should run "node server.js" to initiate the prompts.  The 100% command line application will ask what you would like to do and give the user options including viewing employees, roles or departments, as well as, add employee, a role or a department.  After additions to the mysql database, the user will be presented with a new view all to include the new addition.  

![Site](./pics/Screenshot%202022-11-01%20at%207.35.51%20PM.png)
 
![Site](./pics/Screenshot%202022-11-01%20at%207.36.29%20PM.png)

## Technologies Used
- MySql - Open source database used to store tables in this project. 
- Node.js - An asynchronous event-driven program to run Javascript.
- JavaScript - Allows developer to make static webpages dynamic and interactive.  For this exercise it was used to alter the original webpage to change the questions, change the answers, add a dynamic timer/countdown(that also ends the game), as well as, allow saving of scores.
- Git - Git is what I used to work on my personal computer and pushing my work to GitHub.
- GitHub - A cloud based repository that holds my saved code reserved for resetting my personal computer deployment.

## Description

The purpose of this project was to utilize our skills with Node.js and writing MySql queries so that the user could change and interact with our database.

## Installation

Navigate to file using your command line and run 'npm i'. After the dependencies have been downloaded run 'node index.js' which will trigger the first prompt.  

## Lessons Learned
The most effective lessons learned for me were...
1. Using async functions.  
2. Allowing the user to alter and interact with our specific queries using parameters.


## Code Snippets
JavaScript
```javaScript
const addEmployee = async () => {
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
```
```JavaScript
db.promise().query("UPDATE employee SET ? WHERE employee.id=?", [employeeObj, answers.employee]).then(([empData]) => {
                if (empData.affectedRows > 0) {
                    viewEmployees();
                } else {
                    console.info("Employee creation failed, please try again");
                    startPrompt();
                }
            })
```

## Credits

NA

## License
Please refer to the LICENSE in the Repo.