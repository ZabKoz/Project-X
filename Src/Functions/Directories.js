const path = require('path');

function GetMainDir() {
    return `${path.dirname(require.main.filename)}`;
}

module.exports.GetMainDir = GetMainDir;
