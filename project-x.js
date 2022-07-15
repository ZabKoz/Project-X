require('dotenv').config();
const { Client, Partials, Collection } = require('discord.js');
const ms = require('ms');

const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials;

const client = new Client({
    intents: 131071,
    partials: [
        Channel,
        GuildMember,
        Message,
        Reaction,
        ThreadMember,
        User,
        GuildScheduledEvent
    ],
    allowedMentions: {
        parse: ['roles', 'users']
    },
    rest: {
        timeout: ms('1m')
    }
});

client.events = new Collection();
client.aliases = new Collection();
client.commands = new Collection();

require('./Src/Structures/Validation/Configuration')();

const Handlers = ['Events', 'Commands'];

Handlers.forEach(handler => {
    require(`./Src/Handlers/${handler}`)(client);
});
require('./Src/Structures/Mongoose')();

module.exports = client;

client.login(process.env.client_token);