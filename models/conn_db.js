/*
Here we should enter the spec of connection to the database
*/

var mongoose = require('mongoose');
db = "mongodb://localhost:27017/hvac";

// connect to mongo function
const open = () => {
  let connection = mongoose.connection;
  mongoose.Promise = global.Promise;
  mongoose.connect(db,{ useNewUrlParser: true });
  connection.on('open', () => {
            console.log('::: Connection with MongoDB established');
        });
  return connection;
};

open();

module.exports = open 