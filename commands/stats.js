const { MessageEmbed } = require("discord.js");
const moment = require("moment");
const Command = require("../utils/commandHandler.js");

moment.locale("fr");

module.exports = class stats extends Command {
    constructor() {
        super({
            name: "stats",
            category: "serveur",
            aliases: [],
            description: "Commande permettant de voir les infos concernant un membre",
            usage: (prefix) => `${prefix}stats <membre>`
        });
    }
    async run(message) {
        const member = message.mentions.members.first() || message.member;

        const status = {
            "dnd": "Ne pas déranger",
            "idle": "Inactif",
            "offline": "Hors Ligne",
            "online": "En Ligne"
        }[member.presence.status];

        let embed = new MessageEmbed()
            .setColor(0xdb1111)
            .setTitle(`Statistiques de l'utilisateur ${member.user.tag}`)
            .setThumbnail(member.user.displayAvatarURL())
            .addField("ID :", member.id, true)
            .addField("Discriminant", member.user.discriminator, true)
            .addField("Statut :", status, true)
            .addField("A créé son compte le :", moment.utc(member.user.createdAt).format("LL"), true)
            .addField("A rejoint le serveur le :", moment.utc(member.joinedAt).format("LL"), true)
            .addField("\u200b", "\u200b")
            .addField("Rôles :", member.roles.cache.sort((a, b) => b.position - a.position).map(r => r).join(" | "));

        await message.channel.send(embed);
    }
};