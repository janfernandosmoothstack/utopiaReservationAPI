'use strict'

var routes = require('express').Router();
var flightDao = require('../dao/flightDao');
var itineraryDao = require('../dao/itineraryDao');

//get flight numbers based on departure and arrival airport
routes.get('/flights/from/:depAirport/to/:arrAirport/on/:depDate', function(request, response) {
    const flightFilter = new Object();
    flightFilter.departureAirport = request.params.depAirport;
    flightFilter.arrivalAirport = request.params.arrAirport;
    flightFilter.departureDate = request.params.depDate;

    flightDao.getFlights(flightFilter, function(err, flights) {
        if(err) throw error;

        if (flights.length == 0) {
            const result = {message: "Record not found"};
            response.status(404).send(result);
        } else {
            response.setHeader('Content-Type', 'application/json');
            response.status(200).send(flights);
        }
    });
});

module.exports = routes;