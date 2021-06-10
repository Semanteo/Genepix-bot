const Discord = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class Ban extends Command {
    constructor() {
        super({
            name: "ban",
            category: "admin",
            aliases: [],
            description: "Commande permettant de bannir un membre",
            usage: (prefix) => `${prefix}ban <membre> [raison]`
        });
    }

    async run(client, message, args) {
        const role = message.guild.roles.cache.find(role => role.id === "791681762124103721"); 
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728")) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }

        const member = message.mentions.members.first();
        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner la personne à bannir.");
            msg.delete({timeout: 4000});
            return;
        }

        if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
            const msg = await message.channel.send("Le bot n'a pas la permission !");
            msg.delete({timeout: 4000});
            return;
        }

        member.ban().then(m => {
            let reason = args.slice(2).join(" ");
            if(!reason) reason = "Non spécifiée";
            const banEmbed = new Discord.MessageEmbed()
                .setTitle("Membre Banni")
                .setColor("#ff0000")
                .setThumbnail(m.user.displayAvatarURL())
                .addField("Membre banni", m.user.tag)
                .addField("Banni par", message.author)
                .addField("Raison", reason)
                .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
                .setTimestamp();     
            message.channel.send(banEmbed);
        });
    }
};