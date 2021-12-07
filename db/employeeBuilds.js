const connection = require("../config/connection");

class employeeDB {
    constructor( connection ) {
        this.connection = connection;
    }

    // VIEW ALL EMPLOYEES //
    async allEmployees() {
        return new Promise((resolve, reject) => {
            this.connection.query(
              "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;",
            function (err, results) {
                console.log(err);
                resolve(results);
                reject(err);
              }
            );
          });
    }

    // ADD EMPLOYEE //
    async addEmployee(employee) {
        return new Promise((resolve, reject) => {
          this.connection.query(
            "INSERT INTO employee SET ?",
            employee,
            function (err, results) {
              resolve(results);
              reject(err);
            }
          );
        });
      }

// UPDATE EMPLOYEE ROLE //
async updateEmployeeRole(employeeId, roleId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "UPDATE employee SET role_id = ? WHERE id = ?",
        [roleId, employeeId],
        function (err, results) {
          resolve(results);
          reject(err);
        }
      );
    });
  }


// SHOW MANAGERS //
async allManagers(employeeId) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId,
        function (err, results) {
          resolve(results);
          reject(err);
        }
      );
    });
  }

// SHOW ROLES //
    async allRoles() {
        return new Promise((resolve, reject) => {
          this.connection.query(
            "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;",
            function (err, results) {
              resolve(results);
              reject(err);
            }
          );
        });
      }

// CONVERT DEPT NAME TO ID //
  async getDeptID(name) {
    return new Promise((resolve, reject) => {
      console.log("name " + name);
      this.connection.query(
        "SELECT id FROM department WHERE name = ?;",
        name,
        function (err, results) {
          resolve(results);
          reject(err);
        }
      );
    });
  }

// CREATE ROLE //
async addRole(role) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO role SET ?",
        role,
        function (err, results) {
          resolve(results);
          reject(err);
        }
      );
    });
    // return this.connection.promise().query("INSERT INTO role SET ?", role);
  }

    // SHOW DEPARTMENTS //
    async allDepartments() {
        return new Promise((resolve, reject) => {
          this.connection.query(
            "SELECT department.name, department.id FROM department;",
            function (err, results) {
              resolve(results);
              reject(err);
            }
          );
        });
      }

// ADD A DEPARTMENT //
async addDepartment(department) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        "INSERT INTO department SET ?",
        department,
        function (err, results) {
          resolve(results);
          reject(err);
        }
      );
    });
  }
}


module.exports = new employeeDB(connection);