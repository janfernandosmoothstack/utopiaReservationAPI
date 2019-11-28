var db = require('./database');

exports.createTicket = function(ticket, callback) {
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('insert into Ticket(departureTime, departureDate, flightNo, reservationId) values(?,?,?,?)', [ticket.departureTime, ticket.departureDate, ticket.flightNo, ticket.reservationId], function(err, res) {
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
    db.beginTransaction(function(err) {
        if(err) callback(err, null);

        db.query('select * from Ticket where reservationId',[reservationId], function(err, res) {
            if(err) callback(err, res); 
        });
    });
};

exports.deleteTicket = function(ticketId, callback) {
    db.beginTransaction(function(err) {
        if(err)  callback(err, null);

        db.query('delete from Ticket where ticketId = ?', [ticketId], function(err, res) {
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