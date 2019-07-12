var request = require('request');

var myJSONObject = { "PM": "Packet from server" };
a = () => {
    console.log("Just checking");
    request({
        url: "http://localhost:4001",
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        console.log(response);
    });

    request({
        url: "http://localhost:4002",
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        console.log(response);
    });
}
a()