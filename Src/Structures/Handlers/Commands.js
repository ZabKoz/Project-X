const { Perms } = require('../Validation/Permissions');
const i18n = require('../Systems/I18n');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const chalk = require('chalk');
const PG = promisify(glob);
const logs = console.log;

/**
 * @param { Client } client
 */
 
module.exports = async (client) => {

    const CommandFiles = await PG(`${process.cwd()}/Src/Commands/*/*.js`);

    CommandFiles.map(async (file) => {

        const command = require(file);

        if (!command.name) {
            return logs(
                chalk.red('[🟥]'),
                chalk.gray(
                    i18n.__mf('Handlers.Commands.Missing.Name').replace(/<file>/g, `${chalk.red(file.split('/')[9])}`)
                    )
            );
        }
        else if (!command.context && !command.description){
            return logs(
                chalk.yellow('[🟨]'),
                chalk.gray(
                    i18n.__mf('Handlers.Commands.Missing.Description').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
                    )
            );
        }
        else if (command.UserPerms) {
            if (command.UserPerms.every(perms => Perms.includes(perms))) {
                command.default_member_permissions = false;
            }
            else {
                return logs(
                    chalk.yellow('[🟨]'),
                    chalk.gray(
                        i18n.__mf('Handlers.Commands.Invalid.Permissions').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
                        )
                );
            }
        }
        if (command) {
            client.commands.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name);
                });
            }
            
            logs(
                chalk.green('[🟩]'),
                chalk.gray(
                    i18n.__mf('Handlers.Commands.Information.Loaded').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
                    )
            );
        }
    });
}