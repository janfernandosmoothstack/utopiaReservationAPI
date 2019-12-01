''

var db = require('./database');

exports.getFlights = function(flightFilter, callback) {
    var sql = 'select * from Flights ' + 
        'left join Itinerary on Flights.flightNo = Itinerary.flightNo ' + 
        'where departureAirport = ? and arrivalAirport = ? and departureDate = ? ' +
        'union ' +
        'select * from Flights right join Itinerary on Flights.flightNo = Itinerary.flightNo ' +
        'where departureAirport = ? and arrivalAirport = ? and departureDate = ?';

    db.query(sql, [flightFilter.departureAirport, flightFilter.arrivalAirport, flightFilter.departureDate, flightFilter.departureAirport, flightFilter.arrivalAirport, flightFilter.departureDate], function(err, flights) {
        callback(err, flights); 
    });
};