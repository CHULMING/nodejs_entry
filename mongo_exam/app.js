var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = require('./routes')(app)

var server = app.listen(port, function(){
  console.log('Express server has started on port ' + port);
});

var db = mongoose.connection;
//mongoose.connect('mongodb://username:password@host:port/database?options...');
db.on('error', console.error);
db.once('open', function(){
  console.log("Connected to mongod server");
});

mongoose.connect('mongodb://localhost/mongodb_tutorial');

var Book = require('./models/book');
var router = require('./routes')(app);