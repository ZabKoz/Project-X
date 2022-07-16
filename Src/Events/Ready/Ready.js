const { Client } = require('discord.js');
const i18n = require('../../Structures/I18n');
const chalk = require('chalk');
const logs = console.log;
module.exports = {
    name: 'ready',

    /**
     * @param {Client} client 
     */
    
    async execute(client) {
        const { user } = client;

        logs(
            chalk.white('[⬜]'),
            chalk.gray(
                i18n.__mf('Events.Ready.Logged').replace(/<user>/g, `${chalk.yellow(user.tag)}`)
                )
        );
    }
}