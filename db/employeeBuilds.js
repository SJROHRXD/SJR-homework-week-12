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

//     // UPDATE EMPLOYEE ROLE //
//     updateEmployeeRole(employeeId, roleId) {
//         return this.connection.promise().query(
//             "UPDATE employee SET role_id = ? WHERE id = ?",
//             [roleId, employeeId]
//         );
//     }


//     // SHOW MANAGERS //
//     allManagers(employeeId) {
//         return this.connection.promise().query(
//             "SELECT id, first_name, last_name FROM employee WHERE id != ?",
//             employeeId
//         );
//     }

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

//     // CREATE ROLE //
//     addRole(role) {
//         return this.connection.promise().query("INSERT INTO role SET ?", role);
//     }

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

//     // ADD A DEPARTMENT //
//     addDepartment(department) {
//         return this.connection.promise().query("INSERT INTO department SET ?", department);
//     }
// }

// // module.exports = new employeeDB(connection);


//////
// const mysql = require( 'mysql' );
// class Database {
//     constructor( config ) {
//         this.connection = mysql.createConnection( config );
//     }
//     query( sql, args ) {
//         return new Promise( ( resolve, reject ) => {
//             this.connection.query( sql, args, ( err, rows ) => {
//                 if ( err )
//                     return reject( err );
//                 resolve( rows );
//             } );
//         } );
//     }
//     close() {
//         return new Promise( ( resolve, reject ) => {
//             this.connection.end( err => {
//                 if ( err )
//                     return reject( err );
//                 resolve();
//             } );
//         } );
//     }
}

module.exports = new employeeDB(connection);