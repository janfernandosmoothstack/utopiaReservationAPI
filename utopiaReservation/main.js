var bodyParser = require('body-parser') //representing data in the form i want to receive and send it back
var express = require('express'); //it allows us to create a server and to define our rest end points, it has a routing module
var app = express(); //once imported you must call the constructor
var cors = require('cors');
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); //url is limited to 127 ASCII characters.
//encoding it changes any special characters - not a part of the 127 chars - into acceptable url format

//allows cross implementation so that the domain & sub domain can be without each other 
//remove this in production environment or it will be a security breach
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// parse application/json
//represent java objects in json
app.use(bodyParser.json());

//defining routes to controllers
//everytime you add a new controller, define it here
//controllers are for defining your endpoints
app.use(require('./controllers/bookController'));

app.use(require('./controllers/authorController'));

//start a server on localhost listening on 3000
app.listen(3000);
console.log('Server running in port: 3000 ...')
