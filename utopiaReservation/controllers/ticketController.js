var routes = require('express').Router();
var ticketDao = require('../dao/ticketDao');

//when ticket is posted, minus number of available seats from itinerary chosen
routes.post('/reservations/:reservationId/tickets', function(request, response) {
    var ticket = request.body;
    ticket.reservationId = request.params.reservationId;

    ticketDao.createTicket(ticket, function(err, ticketRes) {
        if(err) {
            console.log(err);
            const result = {message: "Invalid input"};
            response.status(400).send(result);
        }

        response.status(201).send(ticketRes);
    });
});

routes.get('/reservations/:reservationId/tickets', function(request, response) {
    var reservationId = request.params.reservationId;

    ticketDao.getTicket(reservationId, function(err, tickets) {
        if(err) throw error;

        if (tickets.length == 0) {
          const result = {message: "Record not found"};
          response.status(404).send(result);
        } else {
          response.setHeader('Content-Type', 'application/json');
          response.status(200).send(tickets);
        }
    });
});

//validate ticket and reservation
routes.delete('/reservations/:reservationId/tickets/:ticketId', function(request, response){
    var reservationId = request.params.reservationId;
    var ticketId = request.params.ticketId;

    ticketDao.deleteTicket(reservationId, ticketId, function(err, ticket){
      if(err){
        console.log(err);
        const result = {message: "Record not found"};
        response.status(404).send(result);
      }
      
      response.status(204);
    });
  });
  

module.exports = routes;