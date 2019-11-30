//import module
var mysql = require('mysql');

//define db connection
var connection = mysql.createConnection({
    host     : 'lms.cv2mc6y2qhct.us-east-2.rds.amazonaws.com',
    port     : '3306',
    user     : 'admin',
    password : 'teamflash123',
    database : 'UtopiaAirline'
});


connection.connect(function(err){
    if(!err) {
        console.log("Database is connected ... ");
    } else {
        console.log("Error connecting database ... ");
    }
    });

module.exports = connection;