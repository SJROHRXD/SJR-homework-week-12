import { prompt } from "inquirer";
import { updateEmployeeRole as _updateEmployeeRole } from "./db";
import "console.table";
import "./funcions.js";

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

// EXIT //
function quit() {
    process.exit();
}