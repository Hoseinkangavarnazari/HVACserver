const express = require('express')
const app = express()
const port = 3000

var node_route = require('./routes/node.routes');
app.use('/node', node_route);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))