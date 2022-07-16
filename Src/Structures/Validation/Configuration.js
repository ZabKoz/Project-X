const chalk = require('chalk');
const i18n = require('../I18n');
const logs = console.log;

module.exports = async () => {

    const bot_token = process.env.client_token;
    const mongo_token = process.env.mongoose_token;
    const console_lang = process.env.console_language;
    let mistake;

    logs(chalk.bgWhite(" =-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-= "));
    
    if (!console_lang || console_lang.length == 0) {
        mistake = false;
        logs(chalk.red('[🟧]'), chalk.gray(i18n.__mf('Configuration.Console.Language')));
    }
    else if (!bot_token || bot_token.length == 0) {
        mistake = true;
        logs(chalk.red('[🟥]'), chalk.gray(i18n.__mf('Configuration.Bot.Token')));
    }
    else if (!mongo_token || mongo_token.length == 0) {
        mistake = true;
        logs(chalk.red('[🟥]'), chalk.gray(i18n.__mf('Configuration.Database.Url')));
    }

    if (mistake) {
        logs(chalk.red('[🟥]'), chalk.gray(i18n.__mf('Configuration.Information.Mistake')));
        logs(chalk.bgWhite(" =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- "));
        process.exit(42);
    } else {
        logs(chalk.green('[🟩]'), chalk.gray(i18n.__mf('Configuration.Information.Completed')));
        logs(chalk.bgWhite(" =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- "));
    }
}