const newLine = '\n'

/**
 * @description The /say command
 * @param {String} message Message to say
 */
module.exports = (message) => {
    global.PackCompileStream[global.PackCompileStream.currentFunc] += newLine + `say ${message}`
}