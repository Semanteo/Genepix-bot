const Discord = require('discord.js');
const moment = require('moment');
moment.locale("fr");
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "stats",
			category: "serveur",
			aliases: [],
			description: "Commande permettant de voir les infos concernant un membre",
			usage: "{{prefix}}stats <membre>"
		});
	}
run(message, client, args) {

    const membre = message.mentions.members.first() || message.member;
    const userscore = client.getScore.get(membre.id, message.guild.id);
    status = 'none'
    if(membre.presence.status === 'dnd') {status = 'Ne pas déranger'}
    if(membre.presence.status === 'idle') {status = 'Inactif'}
    if(membre.presence.status === 'offline') {status = 'Hors Ligne'}
    if(membre.presence.status === 'online') {status = 'En ligne'}

    let embed = new Discord.MessageEmbed()
    .setColor(0xdb1111)
    .setTitle(`Statistiques de l'utilisateur ${membre.user.tag}`)
    .setThumbnail(membre.user.displayAvatarURL())
    .addField("ID :", membre.id, true)
    .addField("Discriminant", membre.user.discriminator, true)
    .addField("Statut :", status, true)
    .addField("A créé son compte le :", moment.utc(membre.user.createdAt).format('LL'), true)
    .addField("A rejoint le serveur le :", moment.utc(membre.joinedAt).format('LL'), true)
    .addField("\u200b", "\u200b")
    .addField("Rôles :", membre.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(' | '))
    message.channel.send(embed)           
}
};