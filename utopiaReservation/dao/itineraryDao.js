'use strict'

var db = require('./database');

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