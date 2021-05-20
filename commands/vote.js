const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "vote",
			category: "aides",
			aliases: [],
			description: "Commande permettant de rajouter des aides à un membre",
			usage: "{{prefix}}vote {membre} {java, python, rust, javascript, discordjs, discordpy, c, c++, c#, html, php, sys, bdd, arduino, lua, seo, asm}"
		});
	}
run(message, client, args) {
        const membre = message.mentions.members.first()
        if(!membre) {
            return message.channel.send(`Veuillez mentionner la personne pour qui voter`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        }
        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        let score = client.getScore.get(membre.id, message.guild.id);
        if (message.author.id === membre.id) return
        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                java: 0,
                python: 0,
                rust: 0,
                discordjs: 0,
                discordpy: 0,
                c: 0,
                cplus: 0,
                csharp: 0,
                javascript: 0,
                html: 0,
                php: 0,
                sys: 0,
                bdd: 0,
                arduino: 0,
                lua: 0,
                seo: 0,
                asm: 0
            }
        }
            if (args[2] === 'java') {
                score.java++;
                client.setScore.run(score);

                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'python') {
                score.python++;
                client.setScore.run(score);

                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'rust') {
                score.rust++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'discordjs') {
                score.discordjs++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'discordpy') {
                score.discordpy++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c') {
                score.c++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c++') {
                score.cplus++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'javascript') {
                score.javascript++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c#') {
                score.csharp++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'html') {
                score.html++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'php') {
                score.php++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'sys') {
                score.sys++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'bdd') {
                score.bdd++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'arduino') {
                score.arduino++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'lua') {
                score.lua++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'seo') {
                score.seo++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'asm') {
                score.asm++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }   
}
};