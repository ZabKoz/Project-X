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
    async execute(interaction, client) {

        await interaction.deferReply({ ephemeral: true });

        const { options, user, guild } = interaction

        const newPrefix = options.getString('prefix');

        if (newPrefix.length >= 5) {
            return EditReply(interaction, `${client.c.red}`, '', '...', true)
        }

        const Embed = new EmbedBuilder()
            .setColor(client.c.yellow)

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setStyle(ButtonStyle.Success)
                .setCustomId('accept')
                .setLabel('Yes'),

            new ButtonBuilder()
                .setStyle(ButtonStyle.Danger)
                .setCustomId('not-accept')
                .setLabel('No')
        );

        const Page = await interaction.editReply({
            embeds: [
                Embed.setDescription(`Jesteś pewny?`)
            ],
            components: [
                row
            ]
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
                                guildId: interaction.guild.id,
                            }, {
                                guildId: interaction.guild.id,
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
                            Embed.setColor('Green')
                                .setDescription('Usało się !')
                        ],
                        components: []
                    });


                }
                break;

                case 'not-accept': {
                    interaction.editReply({
                        embeds: [
                            Embed.setColor('#ba3c2a')
                                .setDescription('Anulowano!')
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