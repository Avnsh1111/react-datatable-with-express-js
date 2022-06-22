import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import router from './router';
import config from './config';
import session from 'express-session';

import cors from 'cors';

global.database = require("./lib/database");


const app = express();

app.use(cors())

// Set static file location for production
// app.use(express.static(__dirname + '/public'));

// Setting up basic middleware for all Express requests
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(logger('dev')); // Log requests to API using morgan

app.use(express.static('public'));
app.use('/public', express.static(__dirname + '/public'));
// Enable CORS from client-side 
app.use(cors());

// Database Setup
database.sequelizer.sync();

/*const sessionParameters = session({
      secret: config.secret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        path: "/",
        secure: true
      }
    });
    app.use(sessionParameters);*/
router(app);

// Start the server
const server = app.listen(config.port);
console.log(`Your server is running on port ${config.port}.`);

// necessary for testing
module.exports = server;