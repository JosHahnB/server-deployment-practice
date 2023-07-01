'use strict'

// express is the library we import for the server methods and code
const express = require('express');
// dotenv allows us to read from .env file
// const { config } = require('dontenv');
// config();

// const PORT = process.env.PORT

const server = express();
const pageNotFoundHandler = require('./routeErrorHandlers/404.js');
const errorHandler = require('./routeErrorHandlers/500.js')
const stamper = require('./middleware/stamper.js');

// error handler function
// const pageNotFoundHandler = (req, res) => {
//   res.status(404).send({
//     error: 404,
//     route: req.path,
//     message: 'no data on this route'
//   })
// }

// 500 error handler
// const errorHandler = (error, req, res, next) => {
//   res.status(500).send({
//     error: 500,
//     route: req.path,
//     query: req.query,
//     body: req.body,
//     message: 'Server Error: ${error}'
//   })
// };

// middleware 
// middle wear does something with the request that comes in before sending back the response
// const stamper = (req, res, next) => {
//   req.timestamp = new Date();
//   next();
// }

// hello
server.get('/hello', stamper, (req, res) => res.send(`hello ${req.timestamp}`));
// goodbye
server.get('/goodbye', (_, res) => res.send('goodbye'));

server.get('/bad', (req, res, next) => next({ message: 'this is a bad route' }))
// callaback function that is the second argument to an express route can take a third argument called next => passes info to the next process that occurs


// invalid routes
// can do this two ways
// ser.get(/)
server.use('*', pageNotFoundHandler);
server.use(errorHandler);


// server.listen(PORT, () => console.log("I am alive on port " , PORT));

module.exports = server;