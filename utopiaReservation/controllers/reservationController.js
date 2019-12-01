var routes = require('express').Router();
var resDao = require('../dao/reservationDao');

routes.post('/reservations', function(request, result) {
    var reservation = request.body;
    reservation.userId = request.headers.id;

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

// router.post('/', (req, res) => {
//     const { userId, cardNumber, cardType, expirationDate, nameOnCard } = req.body
  
//     const query = `INSERT INTO UtopiaAirline.CardDetails (userId, cardNumber, cardType, expirationDate, nameOnCard) VALUES ('${userId}', '${cardNumber}', '${cardType}', '${expirationDate}', '${nameOnCard}')`
//     db.query(query, (err, results, fields) => {
//       if (err) {
//         const response = { data: null, message: err.message, }
//         res.send(response)
//       }
  
      
//       const payment = { userId, cardNumber, cardType, expirationDate, nameOnCard }
//       const response = {
//         data: payment,
//         message: `Payment ${nameOnCard} successfully added.`,
//       }
//       res.status(201).send(response)
//     })
//   })

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
    reservation.userId = request.headers.id;

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

    resDao.deleteReservation(reservationId, function(err, res){
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