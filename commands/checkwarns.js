const {MessageEmbed} = require("discord.js");
const Command = require("../utils/commandHandler.js");
const { version } = require("../package.json");

module.exports = class CheckWarns extends Command {
    constructor() {
        super({
            name: "checkwarns",
            category: "admin",
            aliases: [],
            description: "Commande permettant de voir les warns d'un membre",
            usage: (prefix) => `${prefix}checkwarns <membre>`
        });
    }

    async run (message, client, args, sql){
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728")) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }

        const member = message.mentions.members.first();
        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner la personne à ban.");
            msg.delete({timeout: 4000});
            return;
        }

        const checkWarnsEmbed = new MessageEmbed()
            .setTitle(`Warns de ${member.user.tag} - ${member.id}`)
            .setColor("#ff0000")
            .setFooter(`Genepix | Version ${version}`, client.user.displayAvatarURL())
            .setTimestamp();     
        const warns = sql.prepare("SELECT * FROM warns WHERE user = ?").all(member.id);

        for(const data of warns){
            checkWarnsEmbed.addField("\u200b", `${client.users.cache.get(data.user)} à été warn par ${client.users.cache.get(data.warner)} pour : ${data.reason}`);
        }

        if(checkWarnsEmbed.fields.length === 0) {
            checkWarnsEmbed.addField("\u200b", `<@${member.id}> n'as aucun warns`);
        }

        await message.channel.send(checkWarnsEmbed);
    }
};