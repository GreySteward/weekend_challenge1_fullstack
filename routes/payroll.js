var express = require('express');
var router =  express.Router();
var path = require('path');
// bring in pg module
var pg = require('pg');
var connectionString = '';


if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/payroll';
}
//
router.post('/payroll', function(req, res) {
    console.log("hello");
    var addPerson = {
        employee_id: req.body.employee_id,
        employee_firstname: req.body.employee_firstname,
        employee_lastname: req.body.employee_lastname,
        employee_jobtitle: req.body.employee_jobtitle,
        employee_salary: req.body.employee_salary,
    };

    pg.connect(connectionString, function (err, client, done) {
        client.query("INSERT INTO payroll (employee_id, employee_firstname, " +
            "employee_lastname, employee_jobtitle, employee_salary) " +
            "VALUES " + "($1, $2) RETURNING person_id",
            [addPerson.employee_id, addPerson.employee_firstname, addPerson.employee_jobtitle,
                addPerson.employee_salary],
            function (err, result) {
                done();
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                } else {
                    res.send(result);
                }
            });
        });
    });

router.get('/', function(req, res) {
    var results = [];
    pg.connect(connectionString, function(err, client, done) {
        var query = client.query('SELECT * FROM payroll;');

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // close connection
        query.on('end', function() {
            client.end();
            return res.json(results);
        });

        if(err) {
            console.log(err);
        }
    });
});

module.exports = router;