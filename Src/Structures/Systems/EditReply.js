const { EmbedBuilder} = require('discord.js');

function EditReply(interaction, color, emoji, description, type) {
    interaction.editReply({
        embeds: [
            new EmbedBuilder()
                .setColor(color)
                .setDescription(description)
        ],
        ephemeal: type
    })
}

module.exports = EditReply;