var routes = require('express').Router();
var resDao = require('../dao/reservationDao');

routes.post('/reservations', function(request, result) {
    var reservation = request.body;

    resDao.createReservation(reservation, function(err, res) {
        if(err) {
            console.log(err);
            result.status(400);
            result.send(res);
        }

        result.status(201);
        result.send(res);
    });
});

routes.get('/reservations/:reservationId', function(request, result) {
    var reservationId = request.params.reservationId;

    resDao.getReservation(function(err, res) {
        if(err) {
            console.log(err);
            result.status(404);
            result.send(res);
        }

        result.setHeader('Content-Type', 'application/json');
        result.send(res);
    });
});