var db = require('./database');

exports.getItineraries = function(flightNoArr, departureDate, callback) {
    var inArr = '';

    for(let i = 0; i < flightNoArr.length; i++){
        inArr += '?,'
    }

    var sql = 'select * from Itinerary where flightNo in (' + inArr +') and departureDate = ?';

    db.query(sql,[flightNoArr, departureDate], function(err, res) {
        callback(err, res); 
    });
};
