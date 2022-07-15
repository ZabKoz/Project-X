const { Client } = require('discord.js');

module.exports = {
    name: 'ready',

    /**
     * @param {Client} client 
     */
    async execute(client) {
        const { user } = client;

        console.log(user.tag)
    }
}