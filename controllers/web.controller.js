var request = require('request');

var myJSONObject = { "PM": "Packet from server" };


exports.callRasp = async (req, res) => {

    let connect = req.body.connect;


    var receivedResponse;

    await request({
        url: connect,
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        console.log(response.body);
        receivedResponse = response.body;
    });

    res.send(receivedResponse)

}


exports.updatedSetPoint = async (req, res) => {

    myJSONObject = {
        temperatureSetPoint: "23",
        humiditySetPoint: "50",
        CO2SetPoint: "50"
    }

    await request({
        url: "http://192.168.12.80:8000",
        method: "POST",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        console.log(response.body);
        receivedResponse = response.body;
    });


}
