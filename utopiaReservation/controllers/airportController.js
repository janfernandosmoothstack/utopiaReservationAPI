var routes = require('express').Router();
var airportDao = require('../dao/airportDao');

routes.get('/airports',function(request ,response){
    airportDao.getAllAirports(function(error, airports){
      if(error) throw error;
      
      response.setHeader('Content-Type', 'application/json');
      response.send(airports);
    });
});

module.exports = routes;