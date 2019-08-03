const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    feedbacks: [
        {
            feedbacks: Number,
            date: { type: Date, default: Date.now }
        }
    ]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;