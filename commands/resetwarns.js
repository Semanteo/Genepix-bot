const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "resetwarns",
			category: "admin",
			aliases: [],
			description: "Commande permettant de reset les warns d'un membre",
			usage: "{{prefix}}resetwarns {Membre}"
		});
	}
run(message, client) {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
        const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
        if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");
        message.channel.send(`<@${membre.id}> a eu ses warns reset`)
        client.clearWarns.run(membre.id)
}
};