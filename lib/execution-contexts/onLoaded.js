module.exports = (callback) => {
    const previousContext = global.PackCompileStream.currentFunc
    global.PackCompileStream.currentFunc = 'setupFunc'
    callback()
    global.PackCompileStream.currentFunc = previousContext
}