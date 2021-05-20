const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "mutelist",
			category: "admin",
			aliases: [],
			description: "Commande permettant de voir la liste des personnes mute",
			usage: "{{prefix}}mutelist"
		});
	}
run(message, client) {
const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728')) return message.channel.send("Vous n'avez pas la permission");
let muteRole = message.guild.roles.cache.find(role => role.name === 'Muet')
if(!muteRole) return message.channel.send("Personne n'as encore été mute sur votre serveur")

const mute = message.guild.roles.cache.get(muteRole.id).members.map(m=>m.user.tag).join('\n')
let embed = new Discord.MessageEmbed()
.setTitle(`Membres mute de ${message.guild.name}`)
.setColor(0xdb1111)
.addField('Membres mutes', "Aucun membre n'est mute en ce moment")
.setFooter(`© Support Bot | Version 1.0`, client.user.displayAvatarURL())
if(!mute) return message.channel.send(embed)  


        message.channel.send({
            embed: {
                color: 0xdb1111,
                title: `Membres mute de ${message.guild.name}`,

                fields: [
                    {
                        name: "Membres mutes",
                        value: mute
                    },                    
                ],
                footer: {
                    text: `Genepix | Version 1.0`,
                    icon_url: client.user.displayAvatarURL()
                }
            }
        });         
}
};