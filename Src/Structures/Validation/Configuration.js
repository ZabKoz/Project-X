const chalk = require('chalk');
const logs = console.log

module.exports = async () => {

    const bot_token = process.env.client_token;
    const mongo_token = process.env.mongoose_token;
    let mistake;

    logs(chalk.bgWhite(" =-=-=-=-=-=-=- Config file Verification -=-=-=-=-=-=-= "));
    if (!bot_token || bot_token.length == 0) {
        mistake = true;
        logs(chalk.red('[🟥]'), chalk.gray('Error: bot token not specified'));
    }
    else if (!mongo_token || mongo_token.length == 0) {
        mistake = true;
        logs(chalk.red('[🟥]'), chalk.gray('Error: mongoose token not specified'));
    }

    if (mistake) {
        logs(chalk.red('[🟥]'), chalk.gray('There are gaps in the required configuration please fill them in'));
        logs(chalk.bgRed(" =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- "));
        process.exit(42);
    } else {
        logs(chalk.green('[🟩]'), chalk.gray('Configuration checked correctly'));
        logs(chalk.bgGreen(" =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- "));
    }
}