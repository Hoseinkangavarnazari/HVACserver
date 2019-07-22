var express = require('express');
var typeOne_router = express.Router();

// Require controller modules.
var typeOne_controller = require('../controllers/typeOne.controller');




//  Post requests
typeOne_router.post('/statuscycle', typeOne_controller.statusCycle);




module.exports = typeOne_router;  