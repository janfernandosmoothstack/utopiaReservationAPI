var db = require('./database');

exports.createReservation = function(reservation, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into Reservation(userId, status) values(?,?)', [reservation.userId, reservation.status], function(err, res) {
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

exports.getReservation = function(reservationId, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('select * from Reservation where reservationId = ?',[reservationId], function(err, res) {
            if(err) callback(err, res); 
        });
    });
};

exports.updateReservation = function(reservation, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('update Reservation set userId = ?, status = ?', [reservation.userId, reservation.status], function(err, res) {
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

exports.deleteReservation = function(reservationId, callback) {
    db.beginTransaction(function(err) {
        if(err)  callback(err, null);

        db.query('delete from Reservation where reservationId = ?', [reservationId], function(err, res) {
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