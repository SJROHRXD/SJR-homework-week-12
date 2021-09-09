import { allEmployees, allRoles, allDepartments, addRole, addDepartment, addEmployee, updateEmployeeRole as _updateEmployeeRole } from "./db";

// VIEW ALL EMPLOYEES ✨ //
export function viewAllEmployees() {
    allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => appPrompts());
}

// VIEW ALL ROLES ✨ //
export function viewAllRoles() {
    allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => appPrompts());
}

// VIEW ALL DEPARTMENTS ✨ //
export function viewAllDepartments() {
    allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => appPrompts());
}

// UPDATE ROLE 🌿 //
export function updateEmployeeRole() {
    allEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Select Employee to update.",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Enter the role of the new Employee.",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => _updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Updated Employee Role! 🌷"))
                                .then(() => appPrompts())
                        });
                });
        })
}

// ADD ROLE 🌿 //
export function createRole() {
    allDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "Enter Role."
                },
                {
                    name: "salary",
                    message: "Enter Salary Rate."
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Enter Department to nest Role under.",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    addRole(role)
                        .then(() => console.log(`${role.title} has been added to DB! 🌷`))
                        .then(() => appPrompts())
                })
        })
}


// ADD DEPARTMENT 🌿 //
export function createDepartment() {
    prompt([
        {
            name: "name",
            message: "Enter Department name."
        }
    ])
        .then(res => {
            let name = res;
            addDepartment(name)
                .then(() => console.log(`${name.name} has been added to DB! 🌷`))
                .then(() => appPrompts())
        })
}

// ADD EMPLOYEE 🌿 //
export function createEmployee() {
    prompt([
        {
            name: "first_name",
            message: "Enter Employee's first name."
        },
        {
            name: "last_name",
            message: "Enter Employee's last name."
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            allRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "Enter Employee's Role.",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            allEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Enter Employee's Manager.",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `${firstName} ${lastName} has been added to DB!`
                                        ))
                                        .then(() => appPrompts())
                                })
                        })
                })
        })
}

// export function quit() {
//     process.exit();
// }

// module.exports = functions;