const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "kick",
			category: "admin",
			aliases: [],
			description: "Commande permettant de kick un membre",
			usage: "{{prefix}}kick + {Membre} + <raison>"
		});
	}
    run(message, client, args){
    const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728')) return message.channel.send("Vous n'avez pas la permission");

    const membre = message.mentions.members.first() || args[1]
    if(!membre) {
        return message.channel.send(`Veuillez mentionner ou mettre l'id de la personne à kick.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
    if(message.mentions.members.first()) {
    var bUser = message.guild.members.cache.find(b => b.user.id === membre.id)
    }
    if(!message.mentions.members.first() && args[1]) {
        var bUser = message.guild.members.cache.find(b => b.user.id === membre)
        }
    if(!bUser) {
        return message.channel.send(`Erreur interne`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
    
    if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) return message.channel.send("Le bot n'as pas la permission !")

    bUser.kick().then(member => {
        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'Non spécifiée';
        const kickembed = new Discord.MessageEmbed()
            .setTitle('Membre Kick')
            .setColor('#ff0000')
            .setThumbnail(bUser.user.displayAvatarURL())
            .addField('Membre kick', bUser)
            .addField('Kick par', message.author)
            .addField('Raison', reason)
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
        message.channel.send(kickembed);
    });
}
};