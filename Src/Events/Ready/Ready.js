const { Client } = require('discord.js');
var activities = require('../../../Configuration/Activities.json');
const i18n = require('../../Structures/I18n');
const chalk = require('chalk');
const logs = console.log;

module.exports = {
    name: 'ready',

    /**
     * @param {Client} client 
     */

    async execute(client) {

        setInterval(() => {
            const Activ = Object.values(activities);
            const newActivity = Activ[parseInt(Math.random() * Activ.length)]
                .replace(/<server>/g, i18n.__mf('Events.Ready.Activities.Servers'))
                .replace(/<number>/g, client.guilds.cache.size)

            user.setActivity({
                name: newActivity,
                type: 3
            });
        }, 10000);

        const { user } = client;

        logs(
            chalk.white('[⬜]'),
            chalk.gray(
                i18n.__mf('Events.Ready.Information.Logged')
                .replace(/<user>/g, `${chalk.yellow(user.tag)}`)
            )
        );

        logs(
            chalk.white('[⬜]'),
            chalk.gray(i18n.__mf('Events.Ready.Information.NeedHelp')) +
            chalk.cyan(`[🟦] Discord: ZabKoz#2744\n`)
        );
    }
}