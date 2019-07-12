const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

const serverRouter= express.Router();

serverRouter.get('/', (req, res) => {
  console.log("received a request from browser");
  res.sendFile(path.join(__dirname + '/test.html'));
}
)

app.use('/page', serverRouter);


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());




var node_route = require('./routes/node.routes');
app.use('/node', node_route);




app.listen(port, () => console.log(`::: Example app listening on port ${port}!`))