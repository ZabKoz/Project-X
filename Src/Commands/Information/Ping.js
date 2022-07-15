module.exports = {
    name: 'ping',
    aliases: ['pong'],
    description: 'A',

    async execute (client, message, args) {
        message.reply('Pong')
    }
}