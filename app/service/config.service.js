const fs = require('fs')

class ConfigService {

    constructor() {
        const configRaw = fs.readFileSync('config/config.json')
        const config = JSON.parse(configRaw)
        this.instance = config;
    }

    static getConfig() {
        if (!this.instance) {
            this.instance = new ConfigService();
        }
        return {...this.instance.instance};
    }
}

module.exports = ConfigService