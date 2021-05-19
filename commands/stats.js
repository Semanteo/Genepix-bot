const Discord = require('discord.js');
const moment = require('moment');
moment.locale("fr");

module.exports = function (message, client) {

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
    .addField("Nombre de warns :", userscore.warns, true)
    .addField("Rôles :", membre.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(' | '))
    message.channel.send(embed)
            
}