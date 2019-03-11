const path = require('path');

let env = process.env.NODE_ENV; // environment setting

module.exports = require(path.resolve(__dirname, 'config', 'dev.js'));


