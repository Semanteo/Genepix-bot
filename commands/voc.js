const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "voc",
			category: "serveur",
			aliases: [],
			description: "Commande permettant de voir les infos concernant les temps passés en voc",
			usage: "{{prefix}}voc {time <membre>}/{lb}"
		});
	}
run(message, client, args, sql) {

    if(args[1] === 'time'){
        const membre = message.mentions.members.first() || message.member;

        let userscore = client.getScore.get(membre.id, message.guild.id);

        if (!userscore) return message.reply(`Nous n'avons pas trouvé ${membre.user.tag}`)
        const embed = new Discord.MessageEmbed()
            .setAuthor(membre.user.username, membre.user.displayAvatarURL({dynamic: true}))
            .addFields({name: "Votre temps passé en voc", value: "\u200b"})
            .setColor(0x020000)
        
        
        if (userscore.voc !== 0) {
            const days = Math.floor(userscore.voc / 86400);
            const hours = Math.floor((userscore.voc - (Math.floor(userscore.voc / 86400) * 86400)) / 3600);
            const minutes = Math.floor((userscore.voc - (Math.floor(userscore.voc / 3600) * 3600)) / 60);
            const seconds = Math.floor(userscore.voc % 60)
            const time = `${days}d ${hours}h ${minutes}m et ${seconds}s`
            embed.addFields({
                name: "🎵 VOC",
                value: `<:embed:801174015406374933> ${membre} • **${time}**`,
                inline: false
            });
        }
        if (userscore.voc === 0) {
            embed.addFields({name: `Aucun temps passé en voc`, value: `<:embed:801174015406374933>`, inline: false})
        }
        return message.channel.send({embed});
    }

    if(args[1] === 'lb'){
        const voc = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY voc DESC LIMIT 10;").all(message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setTitle("Leaderboards temps passé en voc")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .addFields({
                name: "Exemple: \nClassement",
                value: `<:embed:801174015406374933> @Pseudo • **temps passé**`,
                inline: false
            })
            .setColor(0x020000);
            var id = 1
        for (const data of voc) {
            const days = Math.floor(data.voc / 86400);
            const hours = Math.floor((data.voc - (Math.floor(data.voc / 86400) * 86400)) / 3600);
            const minutes = Math.floor((data.voc - (Math.floor(data.voc / 3600) * 3600)) / 60);
            const seconds = Math.floor(data.voc % 60)
            const time = `${days}d ${hours}h ${minutes}m et ${seconds}s`
            embed.addFields({
                name: `🎵 ${id}`,
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${time}**`,
                inline: false
            });
            id++
        }
        return message.channel.send({embed});
    }
}
};