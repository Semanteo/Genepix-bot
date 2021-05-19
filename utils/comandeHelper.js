const path = require('path')
const fsPromises = require('fs').promises

class Command {
    /**
     * @param {string} name - Nom de la commande
     * @param {function} func - Fonction de la commande
     */
    constructor(name, func) {
        this.name = name
        this.func = func
    }
}

class CommandFactory {

    /**
     * Renvois la liste des nom des commandes
     * @returns {Promise<string[]>}
     */
    static async readCommands() {
        const folderPath = path.join(__dirname, '..', 'commands')
        const fileNames = await fsPromises.readdir(folderPath)
        return fileNames.filter(name => /\.js$/.test(name)).map(name => name.replace('.js', ''))
    }

    /**
     * Initialise et stock toutes les commandes
     * @returns {Promise<void>}
     */
    static async initialize() {
        if (this.initialized) {
            return
        }
        const commandNames = await this.readCommands()
        for (const name of commandNames) {
            try{
                const func = require(`../commands/${name}.js`)
                this.commands.set(name, new Command(name, func))
            }catch (e){
                console.error(e)
                console.log(`../commands/${name}.js`)
            }
        }
        this.initialized = true
    }

    /**
     * Récupére la commande par string si elle et présente
     * @param {string} name
     * @returns {Command}
     */
    static getCommand (name) {
        return this.commands.get(name)
    }
}

CommandFactory.initialized = false
CommandFactory.initialize()

/**
 * Inisialisaion des commandes
 * @type {Map<string, Command>}
 */
CommandFactory.commands = new Map()

module.exports = CommandFactory