var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const connection = require("./conn_db")

var typeTwo = new Schema({
    ID: String,
    year: String, // e.g., 21/10/98
    sensorData: [{
        month: String, // e.g., 10
        day: String,  // e.g, 12
        avgTemprature: { type: Number, default: -1 },
        avgHumidity: { type: Number, default: -1 },
        avgCO2: { type: Number, default: -1 }
    }],
    MVdata: [{
        month: { type: Number },
        mvDataInnerMonth:  // e.g., 10
            [{
                day: String,  // e.g, 12
                time: String,
                status: { type: Boolean, default: false }
            }]
    }]

});

module.exports = mongoose.model('TypeTwo', typeTwo);