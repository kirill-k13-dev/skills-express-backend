const { appLogger, debugLogger, getLogger }  = require('../helpers/logger');

module.exports = (router) => {
  router.get('/logger', (req, res) => {
    appLogger.info('This is info log (appLogger)');
    appLogger.warn('This is warn log (appLogger)');
    appLogger.error('This is error log (appLogger)');

    debugLogger.info('This is info log (debugLogger)');
    debugLogger.warn('This is warn log (debugLogger)');
    debugLogger.error('This is error log (debugLogger)');

    const customLogger = getLogger('custom');
    customLogger.info('This is info log (customLogger)');
    customLogger.warn('This is warn log (customLogger)');
    customLogger.error('This is error log (customLogger)');

    res.sendStatus(200);
  })

  router.get('/logger/error', () => {
    throw new Error('This is a custom error');
  })
};
