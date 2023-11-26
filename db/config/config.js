const {db} = require('../../config');
const {logSlowQuery} = require("../../helpers/logger");


module.exports = {
    username: db.user,
    password: db.password,
    database: db.name,
    host: db.host,
    port: db.port,
    dialect: 'mysql',
    operatorsAliases: 0,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    benchmark: true,
    logging: (a, b) => {
      if (b > 1000) logSlowQuery(a, b);
    },
}
