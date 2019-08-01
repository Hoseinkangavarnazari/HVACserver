const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 5000;
const winston = require('winston')
const { createLogger, format } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);

 
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore(),

  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))



// serve static files
app.use(express.static('public'))


// logger setting establishment
const transports = {
  console: new winston.transports.Console({ level: 'warn' }),
  file: new winston.transports.File({ filename: 'combined.log', level: 'error' })
};

const logger = winston.createLogger({
  format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    transports.console,
    transports.file
  ]
});

// activate info level logs
transports.console.level = 'info';
transports.file.level = 'info';

//-------------------------------------------------


logger.log({
  level: 'info',
  message: 'Testing the logger in the code!'
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



//  serve dashboard page ---------------------------------
const serverRouter = express.Router();
serverRouter.get('/', (req, res) => {
  console.log("received a request from browser");
  res.sendFile(path.join(__dirname + '/test.html'));
}
)
app.use('/page', serverRouter);

// --------------------------------------------------------

// communication from rasp to server --------------------

var node_route = require('./routes/node.routes');
app.use('/node', node_route);

var typeOne_route = require('./routes/typeOne.routes');
app.use('/typeone', typeOne_route);


// ------------------------------------------------------

// communication from dashbord to server ---------------
// and may from server to raspberry and back -----------

var web_route = require('./routes/web.routes');
app.use('/webapi', web_route);

// -----------------------------------------------------

app.get('/', (req, res) => {
  console.log('Inside the homepage callback function')
  console.log(req.sessionID)
  res.send(`You hit home page!\n`)
})



ip = "192.168.44.133";
ip = "localhost"
// run server
app.listen(port, ip, () => console.log(`::: Example app on ${ip} listening on port ${port}!`))