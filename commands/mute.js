const Discord = require('discord.js')
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "mute",
			category: "admin",
			aliases: [],
			description: "Commande permettant de mute un membre",
			usage: "{{prefix}}mute + {Membre} + <raison>"
		});
	}
async run(message, client, args) {
    const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728')) return message.channel.send("Vous n'avez pas la permission");


    const membre = message.mentions.members.first() || args[1]
    if(!membre) {
        return message.channel.send(`Veuillez mentionner ou mettre l'id de la personne à mute.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
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
    if(membre.id === message.author.id){
        return message.channel.send(`Vous ne pouvez pas vous automute.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }

    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("Le bot n'as pas la permission !")


    
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muet')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muet',
                    color: 'RANDOM',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        if(bUser.roles.cache.has(muteRole.id)) return message.channel.send(`Cet utilisateur est déjà mute`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        await bUser.roles.add(muteRole)
        

            let reason = args.slice(2).join(' '); 
            if(!reason) reason = 'Non spécifiée';
            const muteembed = new Discord.MessageEmbed()
            .setTitle('Mute')
            .setColor('#ff0000')
            .setThumbnail(bUser.user.displayAvatarURL())
            .addField('Membre mute', bUser)
            .addField('Mute par', message.author)
            .addField('Raison', reason)
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
            
            message.channel.send(muteembed);
}
};