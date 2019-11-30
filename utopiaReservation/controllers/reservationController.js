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

    resDao.getReservation(reservationId, function(err, res) {
        if(err) throw error;
        result.setHeader('Content-Type', 'application/json');
        result.send(res);
    });
});

routes.put('/reservations/:reservationId', function(request, result) {
    var reservation = request.body;
    reservation.reservationId = request.params.reservationId;

    resDao.updateReservation(reservation, function(err, res) {
        if(err) {
            console.log(err);
            result.status(404);
            result.send(res);
        }

        result.status(200);
        result.send(res);
    });
});

routes.delete('/reservations/:reservationId', function(request, result){
    var reservationId = request.params.reservationId;

    resDao.removeBook(reservationId, function(err, res){
      if(err){
        console.log(err);
        result.status(404);
        result.send(res);
      }
      
      result.status(204);
      result.send(res);
    });
  });
  

module.exports = routes;