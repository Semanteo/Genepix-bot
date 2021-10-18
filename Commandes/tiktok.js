const Discord = require('discord.js');
const TikTokScraper = require('tiktok-scraper');
const { MessageEmbed } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');

module.exports = {
    name: "tiktok",
    category: "genepix",
    aliases: [],
    description: "Commande permettant de voir les infos concernant le tiktok de genepix",
    usage: "{{prefix}}tiktok",
	data: new SlashCommandBuilder()
		.setName('tiktok')
		.setDescription('Commande permettant de voir les infos concernant le tiktok de genepix'),
	async execute(client, interaction) {

            const user = await TikTokScraper.getUserProfileInfo('genepixontiktok');
            let em = new MessageEmbed()
                .setAuthor("Infos sur la chaine tiktok de Genepix")
                .addField("Description", `${user.user.signature}`)
                .addField("Abonnés", `${user.stats.followerCount}`)
                .addField("Abonnements", `${user.stats.followingCount}`)
                .addField("Likes", `${user.stats.heart}`)
                .addField("Nombre de vidéos", `${user.stats.videoCount}`)
                .addField("Lien de la description", `${user.user.bioLink.link}`)
                .addField("Lien de la chaine", 'https://www.tiktok.com/@genepixontiktok?lang=fr')
            await interaction.reply({embeds: [em]})

	}
};