const Discord = require('discord.js');

module.exports = function (message, client) {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
        const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
        if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");
        message.channel.send(`<@${membre.id}> a eu ses warns reset`)
        client.clearWarns.run(membre.id)
}