'use strict';

require('dotenv').config();

//require('./lib/server').start(process.env.PORT);

const server = require('./lib/server');

server.start(process.env.PORT)
  .then(console.log)
  .catch(console.log);

// server.stop()
//   .then(console.log)
//   .catch(console.log);

//to start server, type the following into the terminal:
//nodemon index

////////to create a new note, type the following command into the command line
//echo '{"title":"First Note", "content":"Note Text"}' | http post http://localhost:8080/api/notes
//echo '{"title":"Second Note", "content":"Note Text"}' | http post http://localhost:8080/api/notes


//////to find a specifc note by its id, then copy the id number from the terminal, for example id = b98b8000-b622-11e7-bcc7-9991b0181177
//http get http://localhost:8080/api/notes?id=b98b8000-b622-11e7-bcc7-9991b0181177

/////////list out all the notes
//http get http://localhost:8080/api/notes
