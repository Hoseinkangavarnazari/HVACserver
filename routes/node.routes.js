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


module.exports = node_router;