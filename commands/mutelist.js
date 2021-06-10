const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class MuteList extends Command {
    constructor() {
        super({
            name: "mutelist",
            category: "admin",
            aliases: [],
            description: "Commande permettant de voir la liste des personnes mute",
            usage: (prefix) => `${prefix}mutelist`
        });
    }
    run(message, client) {
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role) || message.author.id === "398126558432329728")) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }
        let muteRole = message.guild.roles.cache.find(role => role.name === "Muet");
        if(!muteRole) {
            message.channel.send("Personne n'a encore été mute sur votre serveur");
            return;
        }

        const mute = message.guild.roles.cache.get(muteRole.id).members.map((m) => m.user.tag).join("\n");

        const embed = new MessageEmbed()
            .setTitle(`Membres mute de ${message.guild.name}`)
            .setColor(0xdb1111)
            .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL());

        if(!mute) {
            embed.addField("Membres mutes", "Aucun membre n'est mute en ce moment");
            message.channel.send(embed);
            return;
        }

        embed.addField("Membres mute", mute);

        message.channel.send(embed);
    }
};