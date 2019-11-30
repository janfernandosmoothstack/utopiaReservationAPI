var db = require('./database');

exports.getFlights = function(flights, callback) {
    db.query('select * from Flights where departureAirport = ? and arrivalAirport = ?',[flights.departureAirport, flights.arrivalAirport], function(err, res) {
        callback(err, res); 
    });
};