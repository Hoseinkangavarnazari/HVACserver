var express = require('express');
var node_router = express.Router();

// Require controller modules.
var node_controller = require('../controllers/node.controller');


node_router.get('/status',node_controller.getStatus);
node_router.get('/newNode',node_controller.addNewNode);
// About page route.
node_router.get('/about', function (req, res) {
    res.send('tell about the raspberryPi');
})


//  Post requests

node_router.post('/addNode', node_controller.addNode);
module.exports = node_router;