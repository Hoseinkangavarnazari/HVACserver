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
const axios = require('axios');
const bcrypt = require('bcrypt-nodejs');

const users = [
  {id: '2f24vvg', email: 'test@test.com', password: 'password'}
]


// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
    axios.get(`http://localhost:5000/users?email=${email}`)
    .then(res => {
      const user = res.data[0]
      if (!user) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      if (password != user.password) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, user);
    })
    .catch(error => done(error));
  }
));


// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  axios.get(`http://localhost:5001/users/${id}`)
  .then(res => done(null, res.data) )
  .catch(error => done(error, false))
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
  res.send(`You hit home page!\n`)
})


// think it is someting that returns as a login page
app.get('/login', (req, res) => {
  res.send(`You got the login page!\n`)
})

// think it will be fired when the form have been submitted
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(info) {return res.send(info.message)}
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.login(user, (err) => {
      if (err) { return next(err); }
      return res.redirect('/authrequired');
    })
  })(req, res, next);
})

app.get('/authrequired', (req, res) => {
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