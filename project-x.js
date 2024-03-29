require('dotenv').config();
const { Client, Partials, Collection } = require('discord.js');
const color = require('./Configuration/Colors.json');
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

client.c = color;
client.slashCommands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.commands = new Collection();

require('./Src/Structures/Validation/Configuration')();

const Handlers = [
    'Events',
    'Commands',
    'SlashCommands',
    'Languages'
];

Handlers.forEach(handler => {
    require(`./Src/Structures/Handlers/${handler}`)(client);
});
require('./Src/Structures/Mongoose')();

module.exports = client;

client.login(process.env.client_token);