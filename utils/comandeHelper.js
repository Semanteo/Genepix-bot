const path = require('path')
const fsPromises = require('fs').promises

class Command {
    /**
     * @param {string} name - Nom de la commande
     * @param {function} func - Fonction de la commande
     */
    constructor(name, func) {
        this.name = name
        /**
         * Aucun paramètre sont obligatoire dans les fichier de commandes,
         * il doivent cependant tous être fournis sur l'événement de message
         *
         * @param {import('discord.js').Message} message - Événement de message primordial pour répondre à une commandes
         * @param {import('discord.js').Client} client - Client du bot utile pour récupérés des information
         * @param {string[]} args - Tableau d'arguments de la commandes
         * @param {import('better-sqlite3').Database} sql - Gestionnaire de base de données SQLite
         * @type {Function}
         */
        this.func = func
    }
}

class CommandFactory {

    /**
     * @returns {Promise<string[]>} - Liste des fichier js contenue dans le dossier commandes
     */
    static async readCommands() {
        const folderPath = path.join(__dirname, '..', 'commands')
        const fileNames = await fsPromises.readdir(folderPath)
        return fileNames.filter(name => /\.js$/.test(name)).map(name => name.replace('.js', ''))
    }

    /**
     * Initialise et stock toutes les commandes
     * La methode est appelé une seul fois lors du require du fichier
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
                console.log('Commande '+name+' chargé !')
            }catch (e){
                console.error(e)
                console.log(`Error de l'import de ../commands/${name}.js`)
            }
        }
        this.initialized = true
    }

    /**
     * @param {string} name - Nom de la commande dans la hashmap (correspond au nom du fichier js)
     * @returns {Command} - Commande initialise avec sont attribue func contenant la fonction du fichier js
     */
    static getCommand (name) {
        return this.commands.get(name)
    }
}

// CODE EXECUTE LORS DU REQUIRE DU FICHIER

CommandFactory.initialized = false
/**
 * Initialisation des commandes
 * @type {Map<string, Command>} - Hashmap des commands
 */
CommandFactory.commands = new Map()
CommandFactory.initialize()

module.exports = CommandFactory