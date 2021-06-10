const Discord = require("discord.js");
const Command = require("../utils/commandHandler.js");
const emojis = require("../utils/emojis");

module.exports = class Leaderboard extends Command {
    constructor() {
        super({
            name: "leaderboard",
            category: "aides",
            aliases: ["lb"],
            description: "Commande permettant de voir les référents de chaque langage",
            usage: "{{prefix}}lb"
        });
    }
    run(message, client, args, sql) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Référents")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .addFields({
                name: "Exemple: \nLangage",
                value: "<:embed:801174015406374933> @Pseudo du référent • **Nombre** d'aides",
                inline: false
            })
            .setColor(0x020000);

        const languages = Object.keys(emojis);
        languages.forEach((l) => {
            const req = sql.prepare(`SELECT * FROM scores WHERE guild = ? ORDER BY ${emojis[l].name} DESC LIMIT 1;`).all(message.guild.id);
            const emoji = message.guild.emojis.cache.get(emojis[l].id).id;
            for (const data of req) {
                embed.addField(`${emoji} ${emojis[l].name}`,  `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.javascript}** aides`);
            }
        });

        return message.channel.send({embed});
    }
};