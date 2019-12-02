var routes = require('express').Router();
var resDao = require('../dao/reservationDao');

routes.post('/reservations', (request, response) => {
    var reservation = request.body;
    reservation.userId = request.headers.id;

    resDao.createReservation(reservation, (err, reservationRes) => {
        if(err) {
            console.log(err);
            const result = {message: "Invalid input"};
            response.status(400).send(result);
        }

        response.status(201).send(reservationRes);
    });
});

routes.get('/reservations/:reservationId', (request, response) => {
    var reservationId = request.params.reservationId;

    resDao.getReservation(reservationId, (err, reservationRes) =>{
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
routes.put('/reservations/:reservationId', (request, response) => {
    var reservation = request.body;
    reservation.reservationId = request.params.reservationId;
    reservation.userId = request.headers.id;

    resDao.updateReservation(reservation, (err, reservationRes) => {
        if(err) {
            console.log(err);
            response.status(404).send(reservationRes);
        }

        response.status(200).send(reservationRes);
    });
});

//add error checing for reservationId
routes.delete('/reservations/:reservationId', (request, response) => {
    var reservationId = request.params.reservationId;

    resDao.deleteReservation(reservationId, (err, reservationRes) => {
      if(err){
        console.log(err);
        const result = {message: "Record not found"};
        response.status(404).send(result);
      }
      
      response.status(204);
    });
  });
  

module.exports = routes;