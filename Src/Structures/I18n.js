const { GetMainDir } = require('../Functions/Directories');
const { join } = require('path');
const i18n = require('i18n');

const language = process.env.console_language || "english";

i18n.configure({
    locales: [
        'polish',
        'english',
    ],
    defaultLocale: 'en-US',
    directory: join(GetMainDir(), 'Locales', `Console`),
    retryInDefaultLocale: 'true',
    objectNotation: true,
    autoReload: true,
    register: global,
    mustacheConfig: {
        tags: ["{{", "}}"],
        disable: false,
    },
});

i18n.setLocale(language);

module.exports = i18n;