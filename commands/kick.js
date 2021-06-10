const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class Kick extends Command {
    constructor() {
        super({
            name: "kick",
            category: "admin",
            aliases: [],
            description: "Commande permettant de kick un membre",
            usage: (prefix) => `${prefix}kick <membre> [raison]`
        });
    }
    async run(message, client, args){
        const role = message.guild.roles.cache.find(role => role.id === "791681762124103721");
        if (!(message.member.roles.cache.has(role) || message.author.id === "398126558432329728")) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }

        const member = message.mentions.members.first();
        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner de la personne à kick.");
            msg.delete({timeout: 4000});
            return;
        }
    
        if(!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
            message.channel.send("Le bot n'a pas la permission !");
            return;
        }

        member.kick().then(m => {
            let reason = args.slice(2).join(" ");
            if(!reason) reason = "Non spécifiée";
            const kickembed = new MessageEmbed()
                .setTitle("Membre Kick")
                .setColor("#ff0000")
                .setThumbnail(m.user.displayAvatarURL())
                .addField("Membre kick", m.user.tag)
                .addField("Kick par", message.author)
                .addField("Raison", reason)
                .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
                .setTimestamp();     
            message.channel.send(kickembed);
        });
    }
};