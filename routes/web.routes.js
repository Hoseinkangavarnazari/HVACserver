
var express = require('express');
var web_router = express.Router();

// Require controller modules.
var web_controller = require('../controllers/web.controller');




//  Post requests

web_router.post('/',web_controller.callRasp);
web_router.post('/updateSetPoint',web_controller.updatedSetPoint);




module.exports = web_router;  