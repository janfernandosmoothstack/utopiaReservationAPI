var db = require('./database');

exports.getAllAirports = function(cb){
    db.query('select * from Airport', function(err, result) {
        cb(err, result);
    });
};