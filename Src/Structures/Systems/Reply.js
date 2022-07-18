const { EmbedBuilder} = require('discord.js');

function Reply(interaction, color, emoji, description, type) {
    interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor(color)
                .setDescription(description)
        ],
        ephemeal: type
    })
}

module.exports = Reply;