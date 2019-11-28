//import module
var mysql = require('mysql');

//define db connection
var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'Iamsherlocked#2.0',
    database : 'library'
});

module.exports = connection;