const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "links",
	category: "bot",
	aliases: [],
	description: "Commande permettant de voir les liens concernant le bot",
	usage: "{{prefix}}links",
	data: new SlashCommandBuilder()
	.setName('links')
	.setDescription('Commande permettant de voir les liens concernant le bot'),
	async execute(client, interaction) {
		let embed = new MessageEmbed()
		.setAuthor('Genepix bot', client.user.displayAvatarURL())
    	.setTitle('Links')
    	.addField("Links", "[Tiktok de Genepix](https://www.tiktok.com/@genepixontiktok?lang=fr) | [Site de Genepix](https://ifi.ovh/) | [Github de Genepix](https://github.com/GenepixOnGithub) | [Github du créateur](https://github.com/Semanteo) | [Github du bot](https://github.com/Semanteo/Genepix-bot)")
		 await interaction.reply({embeds: [embed]})
	},
};