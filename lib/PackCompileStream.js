const path = require('path')
const fs = require('fs')
const AdmZip = require('adm-zip')

class PackCompileStream {
    constructor (packYAMLObject, mainDirectory) {
        this.meta = packYAMLObject
        this.mainDirectory = mainDirectory
        this.zip = new AdmZip()

        this.createDistFolder()

        this.mainFunc = ''
        this.setupFunc = ''
        this.currentFunc = 'mainFunc' // Represents the key of the currentFunction literal
    }

    createDistFolder () {
        const distFolder = path.join(this.mainDirectory, 'dist')
        if (!fs.existsSync(distFolder)) {
            fs.mkdirSync(distFolder)
        }
    }

    addFile (fileName, fileContent) {
        this.zip.addFile(fileName, Buffer.from(fileContent, 'utf8'))
    }

    compile () {
        // Add mainfunc
        this.addFile(`data/${this.meta.namespace}/functions/main.mcfunction`, this.mainFunc)
        // Add setupfunc
        this.addFile(`data/${this.meta.namespace}/functions/setup.mcfunction`, this.setupFunc)

        // Add minecraft function executor tags
        this.addFile(`data/minecraft/tags/functions/load.json`, JSON.stringify({
            values: [
                `${this.meta.namespace}:setup`,
            ]
        }))
        this.addFile(`data/minecraft/tags/functions/tick.json`, JSON.stringify({
            values: [
                `${this.meta.namespace}:main`,
            ]
        }))

        // Add pack.mcmeta
        this.addFile('pack.mcmeta', JSON.stringify({
            pack: {
                pack_format: 4,
                description: this.meta.description
            }
        }))

        // Write Zip
        this.zip.writeZip(path.join(this.mainDirectory, 'dist', `${this.meta.namespace}.zip`))
    }
}

module.exports = PackCompileStream