const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class Unban extends Command {
    constructor() {
        super({
            name: "unban",
            category: "admin",
            aliases: [],
            description: "Commande permettant de unban un membre",
            usage: (prefix) => `${prefix}unban <membre>`
        });
    }
    async run(message, client, args) {
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728")) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }

        const member = args[1];
        if(!member) {
            const msg = await message.channel.send("Veuillez mettre l'id de la personne à unban.");
            msg.delete({timeout: 4000});
        }

        const bans = await message.guild.fetchBans();
        if(bans.size === 0) {
            const msg = await message.channel.send("Aucun membre n'est banni sur votre serveur");
            msg.delete({timeout: 4000});
            return;
        }

        let bUser = bans.get(member.id);
        if(!bUser) {
            const msg = await message.channel.send("Ce membre n'est pas banni");
            msg.delete({timeout: 4000});
            return;
        }
        await message.guild.members.unban(bUser.user);

        const unbanEmbed = new MessageEmbed()
            .setTitle("Membre débanni")
            .setColor("#ff0000")
            .setThumbnail(bUser.user.displayAvatarURL())
            .addField("Membre débanni", bUser.user)
            .addField("Débanni par", message.author)
            .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
            .setTimestamp();

        await message.channel.send(unbanEmbed);
    }
};