var routes = require('express').Router();
var flightDao = require('../dao/flightDao');
var itineraryDao = require('../dao/itineraryDao');

routes.get('/flights/from/:depAirport/to/:arrAirport/on/:depDate', function(request, result) {
    const flights = new Object();
    flights.departureAirport = request.params.depAirport;
    flights.arrivalAirport = request.params.arrAirport;
    flights.departureDate = request.params.depDate;

    flightDao.getFlights(flights, function(err, res) {
        if(err) throw error;
        result.setHeader('Content-Type', 'application/json');

        var flightList = res;
        let flightNoArr = [];

        for(let i = 0; i < res.length; i++) {
            flightNoArr.push(res[i].flightNo);
        }

        itineraryDao.getItineraries(flightNoArr, flights.departureDate, function(err, res2) {
            if (err) throw error;

            console.log(res2[0].itineraryId);

        })


        result.send(res);
    });
});

module.exports = routes;