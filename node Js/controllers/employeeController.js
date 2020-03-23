  const express = require('express');
  var router = express.Router();
  var ObjectId = require('mongoose').Types.ObjectId;
  var { Employee } = require('../models/employee');


  // this is similar to get request like this
  //localhost:3000/employees => '/' in employeecontroller 
  router.get('/', (req, res) => {
      Employee.find((err, docs) => {
          if (!err) {
              res.send(docs);
          } else {
              console.log("Error in Retrieving Employees:" + JSON.stringify(err, undefined, 2));
          }
      });
  });




  router.get('/:id', (req, res) => {
      if (!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record is found with this id: ${req.params.id}`);

      Employee.findById(req.params.id, (err, docs) => {
          if (!err) {
              res.send(docs);
          } else {
              console.log("Error in Retriveing employee using id:" + JSON.stringify(err, undefined, 2));
          }
      });
  });


  router.post('/', (req, res) => {
      var emp = new Employee({
          name: req.body.name,
          position: req.body.position,
          office: req.body.office,
          salary: req.body.salary,

      });
      //for inserting new record into the mongodb we need to call save function(from mongoose)
      //for every inserting record the data will have an extra record id (24 hex character string in length)
      emp.save((err, doc) => {
          if (!err) {
              res.send(doc);
          } else {
              console.log("Error in Employee Save :" + JSON.stringify(err, undefined, 2));
          }
      });
  });

  router.put('/:id', (req, res) => {
      if (!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record is found with this id: ${req.params.id}`);
      var emp = {
          name: req.body.name,
          position: req.body.position,
          office: req.body.office,
          salary: req.body.salary,
      };
      Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, docs) => {
          if (!err) {
              res.send(docs);
          } else {
              console.log('Error in Employee Update:' + JSON.stringify(err, undefined, 2));
          }
      });

  });


  router.delete('/:id', (req, res) => {
      if (!ObjectId.isValid(req.params.id)) {
          return res.status(400).send(`NO record is found with id: ${req.params.id}`);
      }

      Employee.findByIdAndRemove(req.params.id, (err, docs) => {
          if (!err) {
              res.send(docs);
          } else {
              console.log('Error in Employee Delete :' + JSON.stringify(err, undefined, 2));
          }
      });
  });

  module.exports = router;