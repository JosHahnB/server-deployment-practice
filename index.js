require('dotenv').config();
const { start } = require('./server.js');
const { dbInstance } = require('./models/index.js');
const PORT = process.env.PORT || 3000;

// add code to connect to database
// get knowledge of any models currently in our code and not in our db and vice- versa
dbInstance
  .sync()
  .then(() => {
    start(PORT);
  })
  .catch(console.error);
