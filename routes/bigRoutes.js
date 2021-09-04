import connection from "../connection";

class employeeDB {

    constructor(connection) {
        this.connection = connection;
    }

    // SHOW ALL E //
    allEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // ADD E //
    addEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employee SET ?", employee);
    }

    // UPDATE E ROLE //
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }


    // SHOW ALL E'S BY MANAGER //
    allManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // SHOW ALL ROLES //
    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
    }

    // CREATE NEW ROLE //
    addRole(role) {
        return this.connection.promise().query("INSERT INTO role SET ?", role);
    }

    // SHOW ALL DEPT //
    allDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    // ADD DEPT //
    addDepartment(department) {
        return this.connection.promise().query("INSERT INTO department SET ?", department);
    }

}

export default new employeeDB(connection);