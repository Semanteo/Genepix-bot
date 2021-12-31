const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config.js');
const fs = require('fs');

const commands = [];
const commandFiles = fs.readdirSync('./Commandes').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	if(file != 'setperm.js') {
		if(file != "unsetperm.js"){
	const command = require(`./Commandes/${file}`);
	commands.push(command.data.toJSON());
		}
	}
}

const rest = new REST({ version: '9' }).setToken(config.bot.token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(config.bot.clientId, config.bot.guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();