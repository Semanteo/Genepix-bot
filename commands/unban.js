const Discord = require('discord.js')
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "unban",
			category: "admin",
			aliases: [],
			description: "Commande permettant de unban un membre",
			usage: "{{prefix}}unban {membre}"
		});
	}
run(message, client, args) {
  const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728')) return message.channel.send("Vous n'avez pas la permission");

    const membre = args[1]
    if(!membre) {
        return message.channel.send(`Veuillez mettre l'id de la personne à unban.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
    if(!message.mentions.members.first() && args[1]) {
        var User = membre
        }
    if(!User) {
        return message.channel.send(`Erreur interne`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
        message.guild.fetchBans().then(bans=> {
        if(bans.size == 0) return message.channel.send("Aucun membre n'est banni sur votre serveur").then(msg => msg.delete({timeout: 4000})).then(message.delete()); 
        let bUser = bans.find(b => b.user.id === User)
        if(!bUser) return message.channel.send("Ce membre n'est pas banni").then(msg => msg.delete({timeout: 4000})).then(message.delete());
        message.guild.members.unban(bUser.user)
        const u = client.users.fetch(membre);
    
        const banembed = new Discord.MessageEmbed()
        .setTitle('Membre débanni')
        .setColor('#ff0000')
        .setThumbnail(bUser.user.displayAvatarURL())
        .addField('Membre débanni', bUser.user)
        .addField('Débanni par', message.author)
        .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
        .setTimestamp()

        message.channel.send(banembed);
    });
}
};