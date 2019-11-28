var db = require('./database');

exports.getFlights = function(airports, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('select * from Flights where departureAirport = ? and arrivalAirport = ?',[airport.departureAirport, airport.arrivalAirport], function(err, res) {
            if(err) callback(err, res); 
        });
    });
};