const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000


app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());




var node_route = require('./routes/node.routes');
app.use('/node', node_route);


app.listen(port, () => console.log(`::: Example app listening on port ${port}!`))