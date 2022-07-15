const { Message, Client } = require('discord.js');
// const client = require('../../project-x');
const mongo = require('../../Structures/Mongoose');
const guildSchema = require('../../Structures/Schemas/Guild-schema');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Client} client
     * @param {Message} message 
     */
    async execute(message, client) {
        const { guild, member } = message;
        if (!guild || member.bot) return;
        let data;
        await mongo().then(async (mongoose) => {
            try {
                data = await guildSchema.findOne({
                    guildId: guild.id,
                });

                if (!data) {
                    let newData = await guildSchema.create({
                        guildId: guild.id,
                    });
                    data = newData;
                }
            } finally {
                mongoose.connection.close();
            }
        });

        if (message.content.toLowerCase().startsWith(data.prefix)) {
            const [cmd, ...args] = message.content.slice(data.prefix.length).trim().split(' ');
            if (cmd.length === 0) return;
            const command = 
                client.commands.get(cmd.toLowerCase()) ||
                client.commands.get(client.aliases.get(cmd.toLowerCase()));

            if (command) {
                command.execute(client, message, args);
            }
        }
    }

}