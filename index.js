const { prompt } = require("inquirer");
const db = require("./db/employeeBuilds");
require("console.table");

// INITIALIZE //
init();
function init() {
    appPrompts();
}

function appPrompts() {
    prompt([
        {
            // QUESTIONS //
            type: "list",
            name: "choice",
            message: "Please, make a selection:",
            choices: [
                {
                    name: "VIEW DEPARTMENTS",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "VIEW ROLES",
                    value: "VIEW_ROLES"
                },
                {
                    name: "VIEW EMPLOYEES",
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "ADD DEPARTMENT",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "ADD ROLE",
                    value: "ADD_ROLE"
                },
                {
                    name: "ADD EMPLOYEE",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "UPDATE EMPLOYEE ROLE",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "QUIT APPLICATION",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        // CALL FUNCTIONS //
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    }
    )
}

// VIEW ALL EMPLOYEES ✨ //
function viewAllEmployees() {
    db.allEmployees()
        .then((rows) => {
            let employees = rows;
            console.log(rows);
            console.table(employees);
        })
        .then(() => appPrompts());
}

// VIEW ALL ROLES ✨ //
function viewAllRoles() {
    db.allRoles()
        .then((rows) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => appPrompts());
}

// VIEW ALL DEPARTMENTS ✨ //
function viewAllDepartments() {
    db.allDepartments()
        .then((rows) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => appPrompts());
}

// // UPDATE ROLE 🌿 //
// function updateEmployeeRole() {
//     db.allEmployees()
//         .then(([rows]) => {
//             let employees = rows;
//             const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
//                 name: `${first_name} ${last_name}`,
//                 value: id
//             }));

//             prompt([
//                 {
//                     type: "list",
//                     name: "employeeId",
//                     message: "Select Employee to update.",
//                     choices: employeeChoices
//                 }
//             ])
//                 .then(res => {
//                     let employeeId = res.employeeId;
//                     allRoles()
//                         .then(([rows]) => {
//                             let roles = rows;
//                             const roleChoices = roles.map(({ id, title }) => ({
//                                 name: title,
//                                 value: id
//                             }));

//                             prompt([
//                                 {
//                                     type: "list",
//                                     name: "roleId",
//                                     message: "Enter the role of the new Employee.",
//                                     choices: roleChoices
//                                 }
//                             ])
//                                 .then(res => db.updateEmployeeRole(employeeId, res.roleId))
//                                 .then(() => console.log("Updated Employee Role! 🌷"))
//                                 .then(() => appPrompts())
//                         });
//                 });
//         })
// }

// // ADD ROLE 🌿 //
// function createRole() {
//     db.allDepartments()
//         .then(([rows]) => {
//             let departments = rows;
//             const departmentChoices = departments.map(({ id, name }) => ({
//                 name: name,
//                 value: id
//             }));

//             prompt([
//                 {
//                     name: "title",
//                     message: "Enter Role."
//                 },
//                 {
//                     name: "salary",
//                     message: "Enter Salary Rate."
//                 },
//                 {
//                     type: "list",
//                     name: "department_id",
//                     message: "Enter Department to nest Role under.",
//                     choices: departmentChoices
//                 }
//             ])
//                 .then(role => {
//                     addRole(role)
//                         .then(() => console.log(`${role.title} has been added to DB! 🌷`))
//                         .then(() => appPrompts())
//                 })
//         })
// }


// // ADD DEPARTMENT 🌿 //
// function createDepartment() {
//     prompt([
//         {
//             name: "name",
//             message: "Enter Department name."
//         }
//     ])
//         .then(res => {
//             let name = res;
//             db.addDepartment(name)
//                 .then(() => console.log(`${name.name} has been added to DB! 🌷`))
//                 .then(() => appPrompts())
//         })
// }

// ADD EMPLOYEE 🌿 //
function createEmployee() {
    prompt([
      {
        name: "first_name",
        message: "Enter Employee's first name.",
      },
      {
        name: "last_name",
        message: "Enter Employee's last name.",
      },
    ]).then((res) => {
      let firstName = res.first_name;
      let lastName = res.last_name;
      // TODO remove [ ]
      db.allRoles().then((rows) => {
        let roles = rows;
        const roleChoices = roles.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
  
        prompt({
          type: "list",
          name: "roleId",
          message: "Enter Employee's Role.",
          choices: roleChoices,
        }).then((res) => {
          let roleId = res.roleId;
  
          db.allEmployees().then((rows) => {
            let employees = rows;
            const managerChoices = employees.map(
              ({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id,
              })
            );
  
            managerChoices.unshift({ name: "None", value: null });
  
            prompt({
              type: "list",
              name: "managerId",
              message: "Enter Employee's Manager.",
              choices: managerChoices,
            })
              .then((res) => {
                let employee = {
                  manager_id: res.managerId,
                  role_id: roleId,
                  first_name: firstName,
                  last_name: lastName,
                };
  
                db.addEmployee(employee);
              })
              .then(() =>
                console.log(`${firstName} ${lastName} has been added to DB!`)
              )
              .then(() => appPrompts());
          });
        });
      });
    });
  }



// module.exports = functions();
// EXIT //
function quit() {
    process.exit();
}