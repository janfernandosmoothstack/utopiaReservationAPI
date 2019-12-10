var routes = require('express').Router();
var resDao = require('../dao/reservationDao');

/* Reservation Object
    userId - Header
    status
    availableSeats
    totalTravelers
*/

//check if seats are available before creating reservation
routes.post('/reservations', (request, response) => {
    var reservation = request.body;
    reservation.userId = request.header('userId');

    

    if(reservation.availableSeats > 0 && reservation.totalTravelers <= reservation.availableSeats) {
        resDao.createReservation(reservation, (err, reservationRes) => {
            if(err) {
                console.log(err);
                const result = {message: "Invalid input"};
                response.status(400).send(result);
            }

            response.status(201).send(reservationRes);
        });
    } else {
        const result = { message: "Not enough seats are available on this flight" };
        response.status(404).send(result);
    }
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
    reservation.userId = request.header('userId');

    resDao.updateReservation(reservation, (err, reservationRes) => {
        if(err) {
            console.log(err);
            response.status(404).send(reservationRes);
        }

        response.status(200).send(reservationRes);
    });
});

//add error checing for reservationId
//add seats back to tickets
routes.delete('/reservations/:reservationId', (request, response) => {
    var reservationId = request.params.reservationId;

    resDao.deleteReservation(reservationId, (err, reservationRes) => {
      if(err){
        console.log(err);
        const result = {message: "Record not found"};
        response.status(404).send(result);
      }
      const result = {message: "Record deleted"};
      response.status(204).send(result);
    });
  });
  

module.exports = routes;