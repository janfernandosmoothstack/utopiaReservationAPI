'use strict'

var routes = require('express').Router();
var flightDao = require('../dao/flightDao');
var itineraryDao = require('../dao/itineraryDao');

//get flight numbers based on departure and arrival airport
routes.get('/flights/from/:depAirport/to/:arrAirport/on/:depDate', function(request, result) {
    const flightFilter = new Object();
    flightFilter.departureAirport = request.params.depAirport;
    flightFilter.arrivalAirport = request.params.arrAirport;
    flightFilter.departureDate = request.params.depDate;

    flightDao.getFlights(flightFilter, function(err, flights) {
        if(err) throw error;
        result.setHeader('Content-Type', 'application/json');

        result.send(flights);
    });
});

module.exports = routes;