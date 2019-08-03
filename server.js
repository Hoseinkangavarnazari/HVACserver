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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]


 // configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    console.log('Inside local strategy callback')
    // here is where you make a call to the database
    // to find the user based on their username or email address
    // for now, we'll just pretend we found that it was users[0]
    const user = users[0] 
    if(email === user.email && password === user.password) {
      console.log('Local strategy returned true')
      return done(null, user)
    }
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  console.log('Inside serializeUser callback. User id is save to the session file store here')
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('Inside deserializeUser callback')
  console.log(`The user id passport saved in the session file store is: ${id}`)
  const user = users[0].id === id ? users[0] : false; 
  done(null, user);
});



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

app.use(passport.initialize());
app.use(passport.session());



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


// create the login get and post routes
app.get('/login', (req, res) => {
  console.log('Inside GET /login callback function')
  console.log(req.sessionID)
  res.send(`You got the login page!\n`)
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    req.login(user, (err) => {
      console.log('Inside req.login() callback')
      console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`)
      console.log(`req.user: ${JSON.stringify(req.user)}`)
      return res.send('You were authenticated & logged in!\n');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
  console.log('Inside GET /authrequired callback')
  console.log(`User authenticated? ${req.isAuthenticated()}`)
  if(req.isAuthenticated()) {
    res.send('you hit the authentication endpoint\n')
  } else {
    res.redirect('/')
  }
})


ip = "192.168.44.133";
ip = "localhost"
// run server
app.listen(port, ip, () => console.log(`::: Example app on ${ip} listening on port ${port}!`))