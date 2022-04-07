// Import mc.js
const { compilePack, definePack, Entity, Commands, onLoaded, Events } = require('../index.js')

// Import needed commands
const { say, tellraw } = Commands

// Set pack metadata using the @pack.yaml file
definePack(__dirname, '@pack.yaml')

// Main code of the example pack
say('Hello World!')
tellraw(Entity.everyPlayer(), {"text":"Hi!","bold":true,"color":"dark_red"})

// Setup function
onLoaded(() => {
    say('Initialized pack')
})

// Compile the pack
compilePack()