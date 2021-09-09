import connection from "../connection";

class employeeDB {

    constructor(connection) {
        this.connection = connection;
    }

    // SHOW ALL DEPT //
    allDepartments() {
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );
    }

    // ADD DEPT //
    addDepartment(department) {
        return this.connection.promise().query(
            "INSERT INTO department SET ?", 
            department
        );
    }

    // DELETE DEPT? //
    // BY NAME//
    // BY ID //
    
    // SHOW ALL ROLES //
    allRoles() {
        return this.connection.promise().query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );

    }

    // ADD ROLE //
    addRole(role) {
        return this.connection.promise().query(
            "INSERT INTO role SET ?", 
            role
        );
    }

    // DELETE ROLE? //
    // BY NAME //
    // BY ID

    // SHOW ALL E //
        // BY DEPT //
        // BY MANAGER //
    allEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // UPDATE E ROLE //
        // MANAGER? //
    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query(
            "UPDATE employee SET role_id = ? WHERE id = ?",
            [roleId, employeeId]
        );
    }

    // ADD E //
    addEmployee(employee) {
        return this.connection.promise().query(
            "INSERT INTO employee SET ?", 
            employee
        );
    }

    // DELETE E ? //

    // SHOW ALL MANAGERS //
    // IDK //
    allManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }
};

export default new employeeDB(connection);