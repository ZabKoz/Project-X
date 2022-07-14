const { Client, Message } = require('discord.js');
const mongo = require('../../Structures/Mongoose');
const guildSchema = require('../../Structures/Schemas/Guild-schema');

module.exports = {
    name: 'messageCreate',

    /**
     * @param {Client} client
     * @param {Message} message 
     */
    async execute(message) {
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
        })

        console.log(data)
    }

}