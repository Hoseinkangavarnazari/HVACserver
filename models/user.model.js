// foreach model we have to coonect


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    hashedpassword: String,
    creationDate: Date,
    body: String,
    feedbacks: [{ setPoint: number, date: Date }],
    date: { type: Date, default: Date.now },
    feedbackBan: Boolean
});

module.exports = mongoose.model('User', userSchema);