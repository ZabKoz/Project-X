const { GetMainDir } = require('../../Functions/Directories');
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

    const LanguagesFiles = await PG(`${GetMainDir()}/Locales/Guild/*.js`);

    LanguagesFiles.map(async (file) => {

        const lang = require(file);

        if (!lang.name) {
            const L = file.split("/");
            logs(
                chalk.red('[🟥]'),
                chalk.gray(
                    i18n.__mf('Handlers.Languages.Missing.Name')
                        .replace(/<file>/g, `${chalk.red(file.split('/')[8])}`)
                )
            );
            return;
        }
        else {
            logs(
                chalk.green('[🟩]'),
                chalk.gray(
                    i18n.__mf('Handlers.Languages.Information.Loaded')
                        .replace(/<lang>/g, `${chalk.green(file.split('/')[8])}`)
                )
            );
        }
    });
}