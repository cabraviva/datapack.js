const path = require('path')
const PackCompileStream = require('./PackCompileStream')

/**
 * 
 * @param {String} directory Directory of the pack (In most cases you want this to be __dirname)
 * @param {String} packYAMLPath pack.yaml filename (In most cases you want this to be @pack.yaml)
 */
module.exports = (directory, packYAMLPath = '@pack.yaml') => {
    // Read file content
    const packYAML = require('fs').readFileSync(path.join(directory, packYAMLPath), 'utf8').toString('utf-8')

    // Parse YAML
    const packYAMLObject = require('js-yaml').load(packYAML)
    global.packYAMLObject = packYAMLObject

    // Intialize PackCompileStream
    global.PackCompileStream = new PackCompileStream(packYAMLObject, directory)
}