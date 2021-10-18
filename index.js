const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const  config  = require('./config.js');
const ascii = require('ascii-table')
let tablee = new ascii("Commands");
let tabl = new ascii("Events");
tablee.setHeading('Command', ' Load status');
tabl.setHeading('Event', ' Load status');


// Create a new client instance
class Genepix extends Client {
    constructor() {
        super({
			intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MEMBERS]
        });
        this.config = require('./config.js');
        this.commands = new Collection();
		
        this.launch();
    }

    launch() {
        this.eventsLoad();
        this.commandsLoad();
        this.login(this.config.bot.token).then(() => console.log(["Genepix"], "Connecté à discord")).catch((e) => {
            console.error(["Base-WS"], `Connection error: ${e}`);
            return process.exit(1);
        });
    }

    eventsLoad() {  
        const eventFiles = fs.readdirSync('./Eventes').filter(file => file.endsWith('.js'));
        if (eventFiles.length === 0) return console.log(["Problem"], "No event found !");
        let count = 0;
		for (const file of eventFiles) {
			try {
			const event = require(`./Eventes/${file}`);
			if(event.name){
				tabl.addRow(file,'✅')
				}
				else {
				tabl.addRow(file, '❌ -> Missing a name, or name is not a string.')
				}
			if(event.once != true){
				this.on(event.name, (...args) => event.execute(this, ...args));
			}
			if (event.once === true) {
				this.once(event.name, (...args) => event.execute(this, tablee, tabl));
			}
			count++
		}catch (err) {
			console.log(["Error"], `An error has occurred:\n\n${err.message}`);
			}
		}
		console.log(tabl.toString());
        console.log(["Events"], `${count}/${eventFiles.length} events chargés`);
    }

    commandsLoad() {
		let count = 0;
		const commandFiles = fs.readdirSync('./Commandes').filter(file => file.endsWith('.js'));
		if (commandFiles.length === 0) return console.log(["Problem"], "No command found !");
		
		for (const file of commandFiles) {
			try {
		const command = require(`./Commandes/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
		if(command.data.name){
		this.commands.set(command.data.name, command);
		tablee.addRow(file,'✅')
		}
		else {
		tablee.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
		}
		count++
	}
	catch (err) {
		console.log(["Error"], `An error has occurred with:\n\n${file}: ${err.message}`);
	}	
	}
	console.log(tablee.toString());
	console.log(["Commands"], `${this.commands.size}/${count} commandes chargées`);
    }
}

module.exports.client = new Genepix();