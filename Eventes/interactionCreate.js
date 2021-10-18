const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');
const { MessageEmbed } = require('discord.js');


module.exports = {
	name: 'interactionCreate',
	async execute(client, interaction) {
        if (interaction.isCommand()){
        const command = interaction.client.commands.get(interaction.commandName);
        

        if (!command) return;
        
        try {
            await command.execute(client, interaction, sql);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
	}
};