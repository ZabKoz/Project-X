const { Message, Client } = require('discord.js');
const guildSchema = require('../../Structures/Schemas/Guild-schema');
const { GetMainDir } = require('../../Functions/Directories');
const mongo = require('../../Structures/Mongoose');

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
        let lang = require(`${GetMainDir()}/Locales/Guild/${data.language.toLowerCase()}`);

        if (message.content.toLowerCase().startsWith(data.prefix)) {
            const [cmd, ...args] = message.content.slice(data.prefix.length).trim().split(' ');
            if (cmd.length === 0) return;
            const command =
                client.commands.get(cmd.toLowerCase()) ||
                client.commands.get(client.aliases.get(cmd.toLowerCase()));

            if (command) {
                command.execute(client, message, args, lang);
            }
        }
    }

}