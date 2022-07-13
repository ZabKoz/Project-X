const { Perms } = require('../Structures/Validation/Permissions');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);
const ms = require('ms');

/**
 * @param { Client } client
 */

module.exports = async (client) => {

    const CommandFiles = await PG(`${process.cwd()}/Commands/*/*.js`);

    CommandFiles.map(async (file) => {

        const command = require(file);

        if (!command.name) {
            return console.log(`[🟥] ${file.split('/')[7]} - Missing name`)
        }
        else if (!command.context && !command.description){
            return console.log(`[🟧] ${command.name} - Missing Description`)
        }
        else if (command.UserPerms) {
            if (command.UserPerms.every(perms => Perms.includes(perms))) {
                command.default_member_permissions = false
            }
            else {
                return console.log(`[🟧] ${command.name} - user permission is Invalid`)
            }
        }
        if (command) {
            client.commands.set(command.name, command)
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name)
                });
            }
            
            console.log(`🟩${command.name}`)
        }
    });
}