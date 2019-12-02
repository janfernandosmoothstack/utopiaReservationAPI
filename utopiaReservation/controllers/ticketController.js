var routes = require('express').Router();
var ticketDao = require('../dao/ticketDao');
var itineraryDao = require('../dao/itineraryDao');

routes.post('/reservations/:reservationId/tickets', function (request, response) {
  var ticket = request.body;
  ticket.reservationId = request.params.reservationId;

  /* Ticket Body
    reservationId
    flightPrice
    itineraryId
    availableSeats
    totalSeats
  */

  if (ticket.availableSeats > 0) {

    ticketDao.createTicket(ticket, function (err, ticketRes) {
      if (err) {
        console.log(err);
        const result = { message: "Invalid input" };
        response.status(400).send(result);
      }

      //minus the number of available seats on the plane
      ticket.availableSeats = ticket.availableSeats - 1;

      itineraryDao.updateItinerary(ticket.itineraryId, ticket.availableSeats, function (err, itinerary) {
          if(err) {
            console.log(err);
            result.status(404);
          }
      });

      response.status(201).send(ticketRes);
    });

  } else {
    const result = { message: "No seats available on this flight" };
    response.status(404).send(result);
  }
});

routes.get('/reservations/:reservationId/tickets', function (request, response) {
  var reservationId = request.params.reservationId;

  ticketDao.getTicket(reservationId, function (err, tickets) {
    if (err) throw error;

    if (tickets.length == 0) {
      const result = { message: "Record not found" };
      response.status(404).send(result);
    } else {
      response.setHeader('Content-Type', 'application/json');
      response.status(200).send(tickets);
    }
  });
});

//validate ticket and reservation
routes.delete('/reservations/:reservationId/tickets/:ticketId', function (request, response) {
  var reservationId = request.params.reservationId;
  var ticketId = request.params.ticketId;

  ticketDao.deleteTicket(reservationId, ticketId, function (err, ticket) {
    if (err) {
      console.log(err);
      const result = { message: "Record not found" };
      response.status(404).send(result);
    }

    response.status(204);
  });
});


module.exports = routes;