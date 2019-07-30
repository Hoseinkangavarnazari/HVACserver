var express = require('express');
var typeOne_router = express.Router();

// Require controller modules.
var typeOne_controller = require('../controllers/typeOne.controller');




//  Post requests

//  it's our ten minute cycle 
typeOne_router.post('/statuscycle', typeOne_controller.statusCycle);

// it's our thirty minute cycle 
typeOne_router.post('/MLCycle', typeOne_controller.MLCycle);




module.exports = typeOne_router;  