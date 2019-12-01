var db = require('./database');

exports.createTicket = function(ticket, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into Ticket(reservationId, flightPrice, itineraryId) values(?,?,?)', [ticket.reservationId, ticket.flightPrice, ticket.itineraryId], function(err, res) {
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

exports.getTicket = function(reservationId, callback) {
    db.query('select * from Ticket where reservationId = ?',reservationId, function(err, tickets) {
        callback(err, tickets); 
    });
};

exports.deleteTicket = function(reservationId, ticketId, callback) {
    db.beginTransaction(function(err) {
        if(err)  callback(err, null);

        db.query('delete from Ticket where reservationId = ? and ticketId = ?', [reservationId, ticketId], function(err, res) {
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