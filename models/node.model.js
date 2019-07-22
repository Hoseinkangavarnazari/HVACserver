var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const connection = require("./conn_db")

var nodeSchema = new Schema({
    IP: String, //check by regex
    ID: String, //check by regex
    currentStatus:{
        status : { type: Boolean, default: true } , 
        setPoint: { type: Number, default: 23 }
    },
    feedbackBan: {type: Boolean , default:false}
});

module.exports = mongoose.model('Node', nodeSchema);