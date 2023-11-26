const bodyParser = require('body-parser');
const multer  = require('multer');
const helmet  = require('helmet');
const app = require('express')();
const cors = require('cors');

const config = require('./config');
const { appLogger, fileErrorLogger}  = require('./helpers/logger');


// use helmet and cors middlewares as simple security
app.use(helmet());
app.use(cors({ credentials: true, origin: config.app.frontUrl }));
// parse application/x-www-form-urlencoded and application/json content types
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({limit: "100mb"}));
// parse any multipart/form-data
app.use(multer().any());

require('./routes')(app);

process.on("unhandledRejection", (reason) => {
  fileErrorLogger.error(reason.stack)
});

app.listen(config.app.port, () => {
  appLogger.info(`App is ready for use. Port: ${config.app.port}; PID: ${process.pid}`);
});




