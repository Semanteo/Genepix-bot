const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class Botinfo extends Command {
    constructor() {
        super({
            name: "unmute",
            category: "admin",
            aliases: [],
            description: "Commande permettant de unmute un membret",
            usage: (prefix) => `${prefix}unmute <membre>`
        });
    }

    async run(message, client) {
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role) || message.author.id === "398126558432329728")) {
            await message.channel.send("Vous n'avez pas la permission");
            return;
        }


        const member = message.mentions.members.first();
        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner la personne à unmute.");
            msg.delete({timeout: 4000});
            return;
        }

        if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
            await message.channel.send("Le bot n'as pas la permission !");
            return;
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muet");
        if(!member.roles.cache.has(muteRole.id)) {
            const msg = await message.channel.send("Cet utilisateur n'est pas mute");
            msg.delete({timeout: 4000});
            return;
        }

        await member.roles.remove(muteRole);
        const unmuteEmbed = new MessageEmbed()
            .setTitle("Unmute")
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Membre unmute", member.user.tag)
            .addField("Unmute par", message.author)
            .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
            .setTimestamp();     

        await message.channel.send(unmuteEmbed);
    }
};