const { Router } = require('express');
const { getCountriesHandler, getStatesHandler, getCitiesHandler } = require('../handlers/locationHandlers');

const locationRouter = Router();

locationRouter.get('/country', getCountriesHandler);                
locationRouter.get('/state', getStatesHandler);              
locationRouter.get('/city', getCitiesHandler);                 

module.exports = locationRouter;