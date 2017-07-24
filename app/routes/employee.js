var Store = require('../models/store.js');
var employee = require("../controllers/EmployeeController.js");

module.exports = function(app, passport) {
    // Get all employees
    app.get('/employees', employee.list);

    // Get single employee by id
    app.get('/employees/show/:id', employee.show);

    // Create employee
    app.get('/employees/create', employee.create);

    // Save employee
    app.post('/employees/save', employee.save);

    // Edit employee
    app.get('/employees/edit/:id', employee.edit);

    // Edit update
    app.post('/employees/update/:id', employee.update);

    // Edit update
    app.post('/employees/delete/:id', employee.delete);
}