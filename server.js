const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const serverRouter = express.Router();


//  serve dashboard page ---------------------------------
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

// ------------------------------------------------------

// communication from dashbord to server ---------------
// and may from server to raspberry and back -----------

var web_route = require('./routes/web.routes');
app.use('/webapi', web_route);

// -----------------------------------------------------

ip = "192.168.40.101";
// run server
app.listen(port,ip, () => console.log(`::: Example app on ${ip} listening on port ${port}!`))