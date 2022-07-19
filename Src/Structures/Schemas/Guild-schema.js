const mongoose = require('mongoose');

const GuildSchema = mongoose.Schema({
    guildId: {
        type: String,
        required: true,
        unique: true,
    },
    prefix: {
        type: String,
        default: 'x.',
    },
    language: {
        type: String,
        default: 'English',
    }
});

module.exports = mongoose.model('Guild', GuildSchema);
