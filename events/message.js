const Discord = require("discord.js");
const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");
const g = "791642103393812490";
const { getScore } = require("../utils/function");

module.exports = async function (client, message) {
    if (message.content.includes("discord.gg/"||"discordapp.com/invite/")) { 
        const msg = await message.delete();
        msg.message.channel.send("Les liens ne sont pas autorisés");
    }

    if (message.channel.id === g) {
        if (message.author.bot) {
            return;
        }

        if(message.author.id !== "799936922939162635"){
            const idee = message.content;
            const member = message.member;
            let embed = new Discord.MessageEmbed()
                .setTitle(`Nouvelle idée de ${member.user.tag}`)
                .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
                .setDescription(`**Idée :** ${idee}`)
                .addField("\u200b", "Réagissez dans <#797472517647630377>")
                .setTimestamp(new Date);
            const c = await message.channel.send(embed).then(message.delete());
            await c.react("<:yes:812255443036274720>");
            await c.react("🤔");
            await c.react("<:no:829015744595099648>");
        }
    }

    if (!message.guild || message.author.bot || !message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !message.content.startsWith(client.config.bot.prefix)) {
        return;
    }

    if (message.author.id === client.user.id) {
        return;
    }

    if (message.guild) {
        let score = getScore(message.author.id, message.guild.id);
        client.setScore.run(score);
    }

    const args = message.content.trim().slice(client.config.bot.prefix.length).split(/ +/g);
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
    
    if (!command) {
        return;
    }

    command.run(message, client, args, sql);
};