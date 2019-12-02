var routes = require('express').Router();
var resDao = require('../dao/reservationDao');

routes.post('/reservations', function(request, response) {
    var reservation = request.body;
    reservation.userId = request.headers.id;

    resDao.createReservation(reservation, function(err, reservationRes) {
        if(err) {
            console.log(err);
            const result = {message: "Invalid input"};
            response.status(400).send(result);
        }

        response.status(201).send(reservationRes);
    });
});

routes.get('/reservations/:reservationId', function(request, response) {
    var reservationId = request.params.reservationId;

    resDao.getReservation(reservationId, function(err, reservationRes) {
        if(err) throw error;

        if (reservationRes.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(reservationRes);
        }
    });
});

//add error checking for reservationId, userId
routes.put('/reservations/:reservationId', function(request, response) {
    var reservation = request.body;
    reservation.reservationId = request.params.reservationId;
    reservation.userId = request.headers.id;

    resDao.updateReservation(reservation, function(err, reservationRes) {
        if(err) {
            console.log(err);
            response.status(404).send(reservationRes);
        }

        response.status(200).send(reservationRes);
    });
});

//add error checing for reservationId
routes.delete('/reservations/:reservationId', function(request, response){
    var reservationId = request.params.reservationId;

    resDao.deleteReservation(reservationId, function(err, reservationRes){
      if(err){
        console.log(err);
        const result = {message: "Record not found"};
        response.status(404).send(result);
      }
      
      response.status(204);
    });
  });
  

module.exports = routes;