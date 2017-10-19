var mongoose = require("mongoose");
// var Employee = mongoose.model("employee");
var Employee = require('../models/employee.js');
//controller object for CRUD operations
var employeeController = {};


//show the list of employees
employeeController.list = function(req, res) {
  Employee.find({}).exec(function (err, employees) {
    if (err) {
      console.log("Error:", err);
    }
    else {
        //passing in employees to the views
      res.render("../views/employees/index", {employees: employees});
    }
  });
};

//show an employee by ID
employeeController.show = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/show", {employee: employee});
    }
  });
};

// for creating an employee... redirects to create page
employeeController.create = function(req, res) {
  res.render("../views/employees/create");
};

//save a new employee
employeeController.save = function(req, res) {
  var employee = new Employee(req.body);

  employee.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/employees/create");
    } else {
      console.log("Successfully created an employee.");
      res.redirect("/employees/show/"+employee._id);
    }
  });
};

//edit employee by ID... redirects to edit page
employeeController.edit = function(req, res) {
  Employee.findOne({_id: req.params.id}).exec(function (err, employee) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/employees/edit", {employee: employee});
    }
  });
};

//update employee
employeeController.update = function(req, res) {
  Employee.findByIdAndUpdate(req.params.id,
  	{ $set:
  	  { name: req.body.name,
  		address: req.body.address,
  		position: req.body.position,
  		salary: req.body.salary }
  	},
  	{ new: true },
  	function (err, employee) {
	    if (err) {
	      console.log(err);
	      res.render("../views/employees/edit", {employee: req.body});
	    }
    	res.redirect("/employees/show/"+employee._id);
  	});
};

//delete employee by ID
employeeController.delete = function(req, res) {
  Employee.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("Employee deleted!");
      res.redirect("/employees");
    }
  });
};

module.exports = employeeController;
