const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "ping",
			category: "bot",
			aliases: [],
			description: "Commande permettant de voir le ping du bot",
			usage: "{{prefix}}ping"
		});
	}
async run(message, client) {
    

    let embed = new Discord.MessageEmbed()
    .setTitle("🏓Ping")
    const m = await message.channel.send(embed)

    let nembed = new Discord.MessageEmbed()
    .setTitle("🏓Pong")
    .addField("**Message**", m.createdAt - message.createdAt + "ms")
    .addField("**API**", Math.round(client.ws.ping))
    m.edit(nembed);
}
};