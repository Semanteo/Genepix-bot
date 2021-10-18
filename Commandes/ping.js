const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "ping",
	category: "bot",
	aliases: [],
	description: "Commande permettant de voir le ping du bot",
	usage: "{{prefix}}ping",
	data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Commande permettant de voir le ping du bot'),
	async execute(client, interaction) {
		let embed = new MessageEmbed()
		.setTitle("🏓Ping")
		.addField("**API**", `${Math.round(client.ws.ping)}`)
		await interaction.reply({embeds: [embed]})
	},
};