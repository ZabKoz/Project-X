const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    guildId: {
        type: String,
        require: true,
        unique: true,
    },
    userId: {
        type: String,
        require: true,
        unique: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
