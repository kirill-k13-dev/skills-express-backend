const express  = require('express');
const router = express.Router();

const testLoggerRoutes = require('./testLoggerRoutes');
const skillRoutes = require('./skillRoutes');
const { httpLogger }  = require('../helpers/logger');


module.exports = function(app) {
  // Add prefix:
  app.use('/node-api/', router);

  // Logging all requests before setting routers
  router.use((req, res, next) => {
    httpLogger.info(`${req.method} ${req.url}`);
    next();
  });

  // Register routes
  testLoggerRoutes(router);
  skillRoutes(router);
};
