const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class Mute extends Command {
    constructor() {
        super({
            name: "mute",
            category: "admin",
            aliases: [],
            description: "Commande permettant de mute un membre",
            usage: (prefix) => `${prefix}mute <membre> [raison]`
        });
    }

    async run(message, client, args) {
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728")) {
            await message.channel.send("Vous n'avez pas la permission");
            return;
        }

        const member = message.mentions.members.first();
        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner la personne à mute.");
            msg.delete({timeout: 4000});
            return;
        }

        if(member.id === message.author.id){
            const msg = await message.channel.send("Vous ne pouvez pas vous automute.");
            msg.delete({timeout: 4000});
            return;
        }

        if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
            await message.channel.send("Le bot n'a pas la permission !");
            return;
        }

        let muteRole = message.guild.roles.cache.find(role => role.name === "Muet");
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: "Muet",
                    color: "#000000",
                    permissions: 0
                }
            });

            message.guild.channels.cache.forEach(channel => channel.createOverwrite(
                muteRole, {
                    SEND_MESSAGES: false,
                    CONNECT: false,
                    ADD_REACTIONS: false
                })
            );
        }

        if(member.roles.cache.has(muteRole.id)) {
            const msg = await message.channel.send("Cet utilisateur est déjà mute");
            msg.delete({timeout: 4000});
            return;
        }
        await member.roles.add(muteRole);

        let reason = args.slice(2).join(" "); 
        if(!reason) {
            reason = "Non spécifiée";
        }
        const muteEmbed = new MessageEmbed()
            .setTitle("Mute")
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL())
            .addField("Membre mute", member.user.tag)
            .addField("Mute par", message.author)
            .addField("Raison", reason)
            .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
            .setTimestamp();     
            
        await message.channel.send(muteEmbed);
    }
};