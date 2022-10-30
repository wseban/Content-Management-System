USE company_db;

INSERT INTO department(dept_name)VALUES("HR"),("Retail");
INSERT INTO role(title, salary, department_id)VALUES("Manager", 100000, 1), ("Clerk", 50000, 2);
INSERT INTO employee(first_name, last_name, role_id, manager_id)VALUES("John", "Mock", 1, NULL), ("Suzie", "Q", 2, 1)
