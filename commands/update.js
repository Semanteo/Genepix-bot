const Discord = require('discord.js');

function warn(message, args) {
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            if (args[1] === '1') {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Nouvelle update`)
                    .addField("⚠️**__Update__**", `Nouvelle commande ajoutée : g!vote.\nFaîtes \`g!help vote\` dans <#791679673599131648> pour plus d'informations !`, true)
                    .setTimestamp(new Date)
                message.channel.send(embed).then(msg => msg.pin())
            }
            if (args[1] === '2') {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Nouvelle update`)
                    .addField("⚠️**__Update__**", `Github ajouté : https://github.com/Semanteo/Genepix-bot !`, true)
                    .setTimestamp(new Date)
                message.channel.send(embed).then(msg => msg.pin())
            }
        } else {
            message.reply("Vous n'avez pas le droit")
        }
    
}
module.exports.warn = warn;