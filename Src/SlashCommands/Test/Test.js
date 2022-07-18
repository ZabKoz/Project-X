const { Client, ChatInputCommandInteraction } = require('discord.js')

module.exports = {
    name: 'test',
    description: 'test command',
    category: 'Information',
    UserPerms: ['SendMessages'],
    BotPerms: ['SendMessages'],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */

    async execute(interaction, client) {
        interaction.reply('Test')
    }
}