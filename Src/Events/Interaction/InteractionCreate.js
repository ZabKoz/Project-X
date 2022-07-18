const { Client, CommandInteraction, InteractionType, EmbedBuilder } = require('discord.js');
const { execute } = require('../../SlashCommands/Test/Test');
const { ApplicationCommand } = InteractionType;

module.exports = {
    name: "interactionCreate",

    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { user, guild, commandName, member, type } = interaction;

        if (!guild || user.bot) return;
        if (type !== ApplicationCommand) return;

        const cmd = client.slashCommands.get(commandName);

        if (!cmd) return;

        client.slashCommands.delete(commandName);

        if (cmd.UserPerms && cmd.UserPerms.length !== 0) {
            if (!member.permissions.has(cmd.UserPerms)) {
                const NoUserPerms = new EmbedBuilder()
                    .setColor('#ba3c2a')
                    .setDescription('Unfortunately, but you don`t have permis')
                interaction.reply({ embeds: [NoUserPerms], ephemeral: true });
            }
            else if (cmd.BotPerms && cmd.BotPerms.length !== 0) {
                if (!member.permissions.has(cmd.BotPerms)) {
                    const NoBotPerms = new EmbedBuilder()
                        .setColor('#ba3c2a')
                        .setDescription('Unfortunately, but I do not have permis')
                    interaction.reply({ embeds: [NoBotPerms], ephemeral: true });
                }
            }
            cmd.execute(interaction, client)
        }
    }
}