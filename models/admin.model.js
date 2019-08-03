// foreach model we have to coonect


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
    adminName: String,
    hashedpassword: String,
    creationDate: Date,
    body: String,
    feedbacks: [{ setPoint: number, date: Date }],
    date: { type: Date, default: Date.now },
    feedbackBan: Boolean
});

module.exports = mongoose.model('admin', adminSchema);