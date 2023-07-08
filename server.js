'use strict'

// express is the library we import for the server methods and code
const express = require('express');
const server = express();
const logger = require('./middleware/logger.js');
const getBrowser = reqire('./middleware/getBrowser.js')
const handle500 = require('./errorHandling/500.js');

// start function used by index
function start(port) {
  server.listen(port, () => console.log(`I can hear you on port ${port}`));
}

// errors
function handle404(req, res, next) {
  const errorObject = {
    status: 404,
    message: 'Sorry, we are unable to find what you are looking for'
  };
  res.status(404).json(errorObject);
}

// if we want the mw applied to every route we put it on top
server.use(logger);

// GLOBAL Express middleware
server.use(express.json());

// route tester
server.get('/', (req, res) => res.send('Hello World!'));

// taking in a query string
server.get('/hello', (req, res) => {
  if (!req.query.name) {
    throw new Error('Wrong! Please tell me your name');
  }
  res.send(`Hello, ${req.query.name}`);
});

// req.param a key-value pair where the key is defined by our route
server.get('/hello/:person', (req, res) => {
  // error handling?
  res.send(`Hello, ${req.params.person}`)
});

// add on to the req.body with a post request
server.post('/hello', (req, res) => {
  //req.body - JSON Object {"key": "value"}
  res.send(`Hello, ${req.body.name}`)
});

//aply middleware to only one route
server.get('/demo', getBrowser, (req, res) => {
  res.send(`You are using ${req.browser}`);
});


server.use('*', handle404);
server.use(handle500);


module.exports = { server, start };