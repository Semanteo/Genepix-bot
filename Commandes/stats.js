const Discord = require('discord.js');
const moment = require('moment');
const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
moment.locale("fr");
module.exports = {
	name: "stats",
	category: "serveur",
	aliases: [],
	description: "Commande permettant de voir les infos concernant un membre",
	usage: "{{prefix}}stats <membre>",
    data: new SlashCommandBuilder()
	.setName('stats')
	.setDescription('Commande permettant de voir les infos concernant un membre')
    .addUserOption(option => option.setName('target').setDescription('Mentionner un user')),
    async execute(client, interaction) {

    const membre = interaction.options.getMember('target') || interaction.guild.members.cache.find(f => f.id === interaction.user.id);

    let embed = new MessageEmbed()
    .setColor(0xdb1111)
    .setTitle(`Statistiques de l'utilisateur ${membre.user.username}#${membre.user.discriminator}`)
    .setThumbnail(membre.user.displayAvatarURL())
    .addField("ID :", membre.user.id, true)
    .addField("Discriminant", membre.user.discriminator, true)
    .addField("A créé son compte le :", moment.utc(membre.user.createdAt).format('LL'), true)
    .addField("A rejoint le serveur le :", moment.utc(membre.user.joinedAt).format('LL'), true)
    .addField("Rôles :", membre.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(' | '), true)
    await interaction.reply({embeds: [embed]})           
}
};