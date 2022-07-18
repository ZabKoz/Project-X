const { Events } = require('../Validation/EventNames');
const i18n = require('../Systems/I18n');
const { Client } = require('discord.js');
const { promisify } = require('util');
const { glob } = require('glob');
const PG = promisify(glob);

/**
 * @param { Client } client
 */

module.exports = async (client) => {

    const EventsFiles = await PG(`${process.cwd()}/Src/Events/*/*.js`);

    EventsFiles.map(async (file) => {

        const event = require(file);

        if (!Events.includes(event.name) || !event.name) {
            const L = file.split("/");
            console.log(`${event.name || i18n.__mf('Handlers.Events.Missing.Name')}`, `=> ${L[6] + '/' + L[7]}`);
            return;
        }
        if (event.once) client.once(event.name, (...args) => event.execute(...args, client));
        else client.on(event.name, (...args) => event.execute(...args, client));
    });
}