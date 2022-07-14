const mongoose = require('mongoose');

const GuildSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    }
})

module.exports = mongoose.model('Guild', GuildSchema);
