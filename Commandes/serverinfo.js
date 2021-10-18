const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');

module.exports = {
    name: "serverinfo",
    category: "serveur",
    aliases: [],
    description: "Commande permettant de voir les infos concernant le serveur",
    usage: "{{prefix}}serverinfo",
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Commande permettant de voir les infos concernant le serveur'),
	async execute(client, interaction) {
		function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " day" : " days") + " ago";
        };    

            const Bots = interaction.guild.members.cache.filter(member => {member.user.bot});

            const embed = new MessageEmbed()
            .setAuthor(`Name : ${interaction.guild.name}`, interaction.guild.iconURL())
            .setDescription("\u200b")
            .addField("Server name", interaction.guild.name, true)
            .addField("Server ID", interaction.guild.id, true)
            .addField("\u200b", "\u200b")
            .addField("Server region", interaction.guild.preferredLocale, true)
            .addField("Server verification Level", interaction.guild.verificationLevel, true)
            .addField("Server announcement channels", `${interaction.guild.channels.cache.filter(m => m.type === 'GUILD_NEWS').size}`, true)
            .addField("Server text channels", `${interaction.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}`, true)
            .addField("Server voice channels", `${interaction.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size}`, true)
            .addField("Server emojis", `${interaction.guild.emojis.cache.size}`, true)
            .addField("Server stickers", `${interaction.guild.stickers.cache.size}`, true)
            .addField("Server Bots", `${Bots.size}`, true)
            .addField("Server total members", `${interaction.guild.memberCount}`, true)
            .addField("Server roles count", `${interaction.guild.roles.cache.size}`, true)
            .addField("Server boosts count", `${interaction.guild.premiumSubscriptionCount}`, true)
            .addField("Creation Date", `${interaction.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(interaction.channel.guild.createdAt)})`, true)
            .setThumbnail(interaction.guild.iconURL())
            
        await interaction.reply({embeds: [embed]});
	},
};