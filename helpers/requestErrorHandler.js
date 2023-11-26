const { boomify } = require('@hapi/boom');
const {appLogger, fileErrorLogger} = require("./logger");
const {errorStatusCodes} = require('../config/constants');

const requestErrorHandler = (err, req, res) => {
  appLogger.debug(err);

  if((!err.status || err.status === 500 || err.statusCode === 500) && (err.output && err.output.payload.message !== 'Session expired')) {
    fileErrorLogger.error(err);
  }

  if (errorStatusCodes[err.constructor]) {
    console.log('FFFFFFFFF');
    boomify(err, errorStatusCodes[err.constructor]);
  }

  if (err.isBoom) {
    const boomError = err.output;

    return res
      .status(boomError.statusCode || 500)
      .json(Object.assign(
        boomError.payload,
        err.data ? { details: err.data } : null
      ));
  }

  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    error: err.name,
    message: err.message,
  });
};

module.exports = requestErrorHandler;
