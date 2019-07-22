var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const connection = require("./conn_db")

var typeOne = new Schema({
    ID: String,
    date: String, // e.g., 21/10/98
    sensorData: [{
        date: { type: String, default: "NONE" },
        avgTemperature: { type: Number, default: -1 },
        avgHumidity: { type: Number, default: -1 },
        avgCO2: { type: Number, default: -1 }
    }],
    MVdata: [{
        date: { type: String, default: "NONE" },
        status: { type: Boolean, default: false }
    }]

});

module.exports = mongoose.model('TypeOne', typeOne);