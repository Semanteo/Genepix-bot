const Command = require("../utils/commandHandler.js");
const Discord = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");

module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "botinfo",
			category: "bot",
			aliases: [],
			description: "Commande permettant de voir des informations sur le bot",
			usage: "{{prefix}}clear"
		});
	}
    run(client, message) {
    const guild = client.guilds.cache.find(g => g.id === '789670704911613992')
    let embed = new Discord.MessageEmbed()
    .setAuthor("Informations sur moi", client.user.displayAvatarURL())
    .setColor(0x8186dc)
    .addField("\\⚙️ **__Configuration__**", `\`\`\`asciidoc\nPROCESSEUR\nCPU        :: ${(os.loadavg()[0]*os.cpus().length / 100).toFixed(2)}%\nMémoire    :: ${Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100}MB\nProcesseur :: (${os.arch()}) ${os.cpus()[0].model}\n            \nINFORMATIONS/VERSIONS   \nNodejs     :: v${process.versions.node}\nDiscord.js :: v${Discord.version}\nUptime     :: ${convertTime(process.uptime())}\`\`\``)
    .addField("\\🙍️ **__Users__**", `**${guild.memberCount}** users`, true)
    .setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
}
};