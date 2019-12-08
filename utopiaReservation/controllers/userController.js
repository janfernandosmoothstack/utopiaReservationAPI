var routes = require('express').Router();
var userDao = require('../dao/userDao');

/* Traveler Object
    firstName
    lastName
    phoneNumber
    email
    address
*/

routes.post('/users', (request, response) => {
    var traveler = request.body;
    console.log(traveler);

    userDao.createUser(traveler, (err, travelerRes) => {
        if (err) {
            console.log(err);
            const result = { message: "Invalid input" };
            response.status(400).send(result);
        }

        response.status(201).send(travelerRes);
    });
});