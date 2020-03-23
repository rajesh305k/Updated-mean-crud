//this is root javascript file 
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js');
var cors = require('cors');
//object destructing the in ES 6
var employeeController = require('./controllers/employeeController');


var app = express();
//we need to configure middle ware to send json data that is body -parser 
app.use(cors());
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server started at the port : 3000"));

app.use('/employees', employeeController);