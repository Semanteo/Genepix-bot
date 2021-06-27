const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { convertTime } = require("../utils/function");

module.exports = class Voc extends Command {
    constructor() {
        super({
            name: "voc",
            category: "serveur",
            aliases: [],
            description: "Commande permettant de voir les infos concernant les temps passés en voc",
            usage: (prefix) => `${prefix}voc [<time> <membre> | <lb>]`
        });
    }
    async run(message, client, args, sql) {
        const embed = new MessageEmbed()
            .setTitle("Votre temps passé en voc")
            .setColor(0x020000);

        if(args[1] === "time") {
            const member = message.mentions.members.first() || message.member;
            let userScore = client.getScore.get(member.id, message.guild.id);

            if (!userScore) {
                await message.reply(`Nous n'avons pas trouvé ${member.user.tag}`);
                return;
            }

            embed.setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }));

            if (userScore.voc !== 0) {
                embed.addField(
                    "🎵 VOC",
                    `<:embed:801174015406374933> ${member} • **${convertTime(userScore.voc)}**`);
            } else {
                embed.addField(
                    "Aucun temps passé en voc",
                    "<:embed:801174015406374933>");
            }
            await message.channel.send(embed);
            return;
        }

        if(args[1] === "lb"){
            const voc = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY voc DESC LIMIT 10;").all(message.guild.id);

            embed
                .setAuthor(client.user.username, client.user.displayAvatarURL())
                .addField(
                    "Exemple: \nClassement",
                    "<:embed:801174015406374933> @Pseudo • **temps passé**");

            let id = 1;
            for (const data of voc) {
                embed.addField(
                    `🎵 ${id}`,
                    `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${convertTime(data.voc)}**`);
                id++;
            }
            await message.channel.send(embed);
        }
    }
};