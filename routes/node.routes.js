var express = require('express');
var node_router = express.Router();

// Require controller modules.
var node_controller = require('../controllers/node.controller');




//  Post requests

node_router.post('/status',node_controller.getStatus);

// no need until now
node_router.post('/addNode', node_controller.addNode);
node_router.post('/delete',node_controller.deleteNode);

// needed __________________________________________________________________________
node_router.post('/detaileds_sensors_data', node_controller.detailedData);
node_router.put('/setpoint',node_controller.updateSetpoint);


module.exports = node_router;  