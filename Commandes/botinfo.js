const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');
module.exports = {
    name: "botinfo",
	category: "bot",
	aliases: [],
	description: "Commande permettant de voir des informations sur le bot",
    usage: "{{prefix}}botinfo",
	data: new SlashCommandBuilder()
		.setName('botinfo')
		.setDescription('Commande permettant de voir des informations sur le bot'),
	async execute(client, interaction) {
		const guild = client.guilds.cache.find(g => g.id === '789670704911613992')
		let embed = new MessageEmbed()
    .setAuthor("Informations sur moi", client.user.displayAvatarURL())
    .setColor(0x8186dc)
    .addField("\\⚙️ **__Configuration__**", `\`\`\`asciidoc\nPROCESSEUR\nCPU        :: ${(os.loadavg()[0]*os.cpus().length / 100).toFixed(2)}%\nMémoire    :: ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100}MB\nProcesseur :: (${os.arch()}) ${os.cpus()[0].model}\n            \nINFORMATIONS/VERSIONS   \nNodejs     :: v${process.versions.node}\nDiscord.js :: v${Discord.version}\nUptime     :: ${convertTime(process.uptime())}\`\`\``)
    .addField("\\🙍️ **__Users__**", `**${guild.memberCount}** users`, true)
    .setThumbnail(client.user.displayAvatarURL())
		await interaction.reply({embeds: [embed], ephemeral: true});
	},
};