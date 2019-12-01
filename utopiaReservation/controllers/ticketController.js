var routes = require('express').Router();
var ticketDao = require('../dao/ticketDao');

//when ticket is posted, minus number of available seats from itinerary chosen
routes.post('/reservations/:reservationId/tickets', function(request, result) {
    var ticket = request.body;
    ticket.reservationId = request.params.reservationId;

    ticketDao.createTicket(ticket, function(err, res) {
        if(err) {
            console.log(err);
            result.status(400);
            result.send(res);
        }

        result.status(201);
        result.send(res);
    });
});

routes.get('/reservations/:reservationId/tickets', function(request, result) {
    var reservationId = request.params.reservationId;

    ticketDao.getTicket(reservationId, function(err, tickets) {
        if(err) throw error;
        result.setHeader('Content-Type', 'application/json');
        result.send(tickets);
    });
});

routes.delete('/reservations/:reservationId/tickets/:ticketId', function(request, result){
    var reservationId = request.params.reservationId;
    var ticketId = request.params.ticketId;

    ticketDao.deleteTicket(reservationId, ticketId, function(err, res){
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