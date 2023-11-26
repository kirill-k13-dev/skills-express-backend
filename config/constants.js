const loggerLabels = {
  APP: 'app',
  DEBUG: 'debug',
  HTTP: 'http'
};

const errorStatusCodes = {
  InvalidInputError: 400,
  WrongOwnershipError: 403,
  ValidationError: 400,
};

module.exports = {
  loggerLabels,
  errorStatusCodes
};
