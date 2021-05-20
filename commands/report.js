const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "report",
			category: "bot",
			aliases: [],
			description: "Commande permettant de report quelqu'un",
			usage: "{{prefix}}report"
		});
	}
run(message) {
            let em = new Discord.MessageEmbed()
                .setAuthor("Comment faire un report")
                .setDescription("Allez sur le lien de [Report](https://forms.gle/BxFH6ZQz5ufvSmXD6) et complétez le formulaire puis la demande sera transmise aux modérateurs")
            message.channel.send(em)
}
};