var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const connection = require("./conn_db")

var nodeSchema = new Schema({
    nodeName: String,
    nodeID: String,
    nodeStatus:{
        status : Boolean , 
        setPoint: Number
    },
    body: String,
    feedbacks: [{ setPoint: number, date: Date }],
    date: { type: Date, default: Date.now },
    feedbackBan: Boolean
});

module.exports = mongoose.model('Node', nodeSchema);