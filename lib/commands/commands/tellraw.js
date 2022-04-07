const { Selector } = require('../../syntax/Entity.js')

const newLine = '\n'

/**
 * @description The /say command
 * @param {Selector} selector Selector to tellraw to
 * @param {Object|String} message Message to tellraw
 */
module.exports = (selector, message) => {
    global.PackCompileStream[global.PackCompileStream.currentFunc] += newLine + `tellraw ${selector.toString()} ${JSON.stringify(message)}`
}