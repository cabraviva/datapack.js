class Selector {
    constructor (template) {
        this.properties = {}

        if (template === '@a') {
            this.base = '@a'
        } else if (template === '@e') {
            this.base = '@e'
        } else if (template === '@p') {
            this.base = '@p'
        } else if (template === '@r') {
            this.base = '@r'
        } else if (template === '@s') {
            this.base = '@s'
        } else {
            throw new TypeError('Invalid selector template: ' + template)
        }
    }

    getPropertiesLiteral () {
        if (!this.properties) return ''

        // Properties have the following format:
        // {a:'b',c:1} => a=b,c=1
        return Object.keys(this.properties).map(key => `${key}=${this.properties[key].toString()}`).join(',')
    }

    getSelector () {
        return `${this.base}[${this.getPropertiesLiteral()}]`
    }

    toString () {
        return this.getSelector()
    }

    // Property functions

    /**
     * @description Limits the maxium amount of entities to select
     * @param {Number} amount Maximum amount of entities to select
     */
    limit (amount) {
        this.properties.limit = amount
    }

    /**
     * @description Limits the maxium amount of entities to select
     * @param {String} amount Maximum amount of entities to select
     */
    sort (sortType) {
        if (sortType !== 'nearest', sortType !== 'random') {
            throw new TypeError(`Invalid sort type: ${sortType} (expected: 'nearest' or 'random'`)
        }

        this.properties.sort = sortType
    }
}

module.exports = {
    every: () => {
        return new Selector('@e')
    },
    everyPlayer: () => {
        return new Selector('@a')
    },
    nearest: () => {
        return new Selector('@p')
    },
    random: () => {
        return new Selector('@r')
    },
    current: () => {
        return new Selector('@s')
    },
    Selector
}