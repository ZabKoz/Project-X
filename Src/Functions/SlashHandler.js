async function createCmd(client, guildId, CommandsArray) {
    
    await client.guilds.cache.get(guildId)?.commands.set(CommandsArray);
}

async function globalCmd(client, CommandsArray) {

    await client.application?.commands.set(CommandsArray);
}

module.exports = { createCmd, globalCmd };