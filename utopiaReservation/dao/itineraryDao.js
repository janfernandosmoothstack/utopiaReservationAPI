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

//get this itineraryId from ticket that is chosen
exports.updateReservation = function(itineraryId, newAvailSeats, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('update Itinerary set availableSeats = ? where itineraryId = ?', [newAvailSeats, itineraryId], function(err, res) {
            if(err) {
                db.rollback(function(err) {
                    callback(err, res);
                });
            }

            db.commit(function(err) {
                callback(err, res);
            });
        });
    });
};