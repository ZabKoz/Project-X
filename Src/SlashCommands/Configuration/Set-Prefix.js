const { Client, ChatInputCommandInteraction, ApplicationCommandOptionType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js')
const guildSchema = require('../../Structures/Schemas/Guild-schema');
const mongo = require('../../Structures/Mongoose');
const EditReply = require('../../Structures/Systems/EditReply');
const ms = require('ms');

module.exports = {
    name: 'setprefix',
    description: 'test command',
    category: 'Configuration',
    UserPerms: ['SendMessages', 'EmbedLinks', 'ManageGuild'],
    BotPerms: ['SendMessages', 'EmbedLinks', 'ManageGuild'],
    options: [
        {
            name: 'prefix',
            description: 'new prefix',
            type: 3,
            required: true,
        }
    ],

    /**
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction
     */
    
    async execute(interaction, client, lang) {

        await interaction.deferReply({ ephemeral: true });

        const { options, user, guild } = interaction;

        const newPrefix = options.getString('prefix');

        if (newPrefix.length >= 5) {
            return EditReply(interaction, `${client.c.red}`, '', `${lang.SET_PREFIX.TOO_LONG}`, true)
        }

        const Embed = new EmbedBuilder()
            .setColor(client.c.yellow)
            .setDescription(lang.SET_PREFIX.SURE.replace(/<prefix>/g, newPrefix))

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('accept')
                .setLabel(lang.SET_PREFIX.ACCEPT),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId('not-accept')
                .setLabel(lang.SET_PREFIX.NOT_ACCEPT)
        );

        const Page = await interaction.editReply({
            embeds: [Embed], components: [row]
        });

        const col = await Page.createMessageComponentCollector({
            componentType: ComponentType.Button,
            time: ms('5s')
        });

        col.on('collect', async i => {
            if (i.user.id !== user.id) return;

            switch (i.customId) {
                case 'accept': {

                    await mongo().then(async (mongoose) => {
                        try {
                            await guildSchema.findOneAndUpdate({
                                guildId: guild.id,
                            }, {
                                prefix: newPrefix,
                            }, {
                                new: true,
                            });
                        } catch (err) {
                            console.log(err);
                        } finally {
                            mongoose.connection.close();
                        }
                    });

                    interaction.editReply({
                        embeds: [
                            Embed.setColor(client.c.green)
                                .setDescription(lang.SET_PREFIX.SUCCESS.replace(/<prefix>/g, newPrefix))
                        ],
                        components: []
                    });


                }
                    break;

                case 'not-accept': {
                    interaction.editReply({
                        embeds: [
                            Embed.setColor(client.c.red)
                                .setDescription(lang.SET_PREFIX.CANCELLED)
                        ],
                        components: []
                    });
                }
                    break;
            }
        });

        col.on('end', (collected) => {
            if (collected.size > 0) return;
        });

    }
}