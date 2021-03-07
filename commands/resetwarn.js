const Discord = require('discord.js');

function resetwarn(message, client) {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        const userscore = client.getScore.get(membre.id, message.guild.id);
        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            message.channel.send(`<@${userscore.user}> a eu ses warns reset`)
            while (userscore.warns != 0) {
                userscore.warns--
            }

            client.setScore.run(userscore)
        } else {
            message.reply("Vous n'avez pas le droit")
        }   
}
module.exports.resetwarn = resetwarn;