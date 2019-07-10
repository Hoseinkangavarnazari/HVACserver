var express = require('express');
var node_router = express.Router();


node_router.get('/status', function (req, res) {
  res.send({
      type:1 , 
      status: "On",
      location:"loremIpsum"
  });
})

// About page route.
node_router.get('/about', function (req, res) {
    res.send('tell about the raspberryPi');
})

module.exports = node_router;