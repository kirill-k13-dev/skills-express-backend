const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');
const { createLogger, format, transports } = winston;
const { grey, green, cyan, blue, magenta } = require('colors');
const { loggerLabels } = require('../config/constants');
const config = require('../config');

const { colorize, combine, timestamp, label, printf, splat, json, metadata, prettyPrint } = format;

const getLabelColor = (label, level) => {
  switch (label) {
    case loggerLabels.APP:
      return green(`[${label}|${level}]`);
    case loggerLabels.DEBUG:
      return blue(`[${label}]`);
    case loggerLabels.HTTP:
      return magenta(`[${label}]`);
    default:
      return cyan(`[${label}|${level}]`);
  }
};

const loggerFormat = printf(info => {
  return `${grey(info.timestamp)} ${getLabelColor(info.label, info.level)}: ${info.message}`;
});

const appLogger = createLogger({
  format: combine(
    colorize(),
    splat(),
    label({ label: loggerLabels.APP }),
    timestamp(),
    loggerFormat
  ),
  transports: [new transports.Console()]
});

const httpLogger = createLogger({
  format: combine(
    colorize(),
    splat(),
    label({ label: loggerLabels.HTTP }),
    timestamp(),
    loggerFormat
  ),
  transports: [new transports.Console()]
});

const debugLogger = createLogger({
  format: combine(
    colorize(),
    splat(),
    label({ label: loggerLabels.DEBUG }),
    timestamp(),
    loggerFormat
  ),
  transports: [new transports.Console()]
});

const fileErrorLogger = createLogger({
  format: combine(
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    metadata(),
    prettyPrint()
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: 'errors-%DATE%.log',
      dirname: config.logging.filePath,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxSize: '40m',
      maxFiles: '30d',
      json: true,
    }),
  ]
});

const fileSlowQueryLogger = createLogger({
  format: combine(
    json(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    metadata(),
    prettyPrint()
  ),
  transports: [
    new DailyRotateFile({
      filename: 'slow-query-%DATE%.log',
      dirname: config.logging.filePath,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      maxSize: '40m',
      maxFiles: '30d',
      json: true,
    }),
  ]
});

const getLogger = (loggerLabel) => {
  return createLogger({
    format: combine(
      colorize(),
      splat(),
      label({ label: loggerLabel }),
      timestamp(),
      loggerFormat
    ),
    level: config.logging.level,
    transports: [new transports.Console()]
  });
};

const logSlowQuery = (query, time) => {
  fileSlowQueryLogger.error(`${time}ms:   ${query}`);
};

module.exports = {
  appLogger,
  fileErrorLogger,
  logSlowQuery,
  httpLogger,
  debugLogger,
  getLogger,
};
