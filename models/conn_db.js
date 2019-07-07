/*
Here we should enter the spec of connection to the database
*/

mongoose = require("mongoose");


// connect to mongo function
const open = () => {
  let connection = mongoose.connection;
  mongoose.Promise = global.Promise;
  mongoose.connect(db);
  mongoose.connection.on('open', () => {
            console.log('We have connected to mongodb');
        });
  return connection;
};


module.exports = open 