const { Perms } = require('../Structures/Validation/Permissions');
const { globalCmd, createCmd } = require('../Functions/SlashHandler');
const i18n = require('../Structures/I18n');
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

    const CommandFiles = await PG(`${process.cwd()}/Src/SlashCommands/*/*.js`);
    const CommandsArray = [];

    CommandFiles.map(async (file) => {

        const command = require(file);

        if (!command.name) {
            return logs(
                chalk.red('[🟥]'),
                chalk.gray(
                    i18n.__mf('Handlers.SlashCommands.Missing.Name').replace(/<file>/g, `${chalk.red(file.split('/')[9])}`)
                )
            );
        }
        else if (!command.context && !command.description) {
            return logs(
                chalk.yellow('[🟨]'),
                chalk.gray(
                    i18n.__mf('Handlers.SlashCommands.Missing.Description').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
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
                        i18n.__mf('Handlers.SlashCommands.Invalid.Permissions').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
                    )
                );
            }
        }
        client.slashCommands.set(command.name, command);
        CommandsArray.push(command);

        logs(
            chalk.green('[🟩]'),
            chalk.gray(
                i18n.__mf('Handlers.SlashCommands.Information.Loaded').replace(/<command>/g, `${chalk.red(file.split('/')[9])}`)
            )
        );
    });
    
    client.on('ready', () => {
        if (process.env.production_mode !== false) {
            globalCmd(client, CommandsArray)
        } else {
            const guildId = process.env.test_server;
            createCmd(client, guildId, CommandsArray)
        }
    })
}