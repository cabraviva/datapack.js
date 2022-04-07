const fs = require('fs')

let commandList = {}

// For every file in ./commands
// e.g. ./commands/say.js => commandList.say = require('./commands/say')
for (let file of fs.readdirSync(__dirname + '/commands')) {
    if (file.endsWith('.js')) {
        commandList[file.slice(0, -3)] = require(`./commands/${file}`)
    }
}

module.exports = commandList