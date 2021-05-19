const Discord = require('discord.js');

module.exports = function (message, client, args) {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
        const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')        
        if(!membre) {
            return message.channel.send(`Veuillez mentionner la personne à warn.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        }
        let reason = args.slice(2).join(' ');

        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2)) {
            if(!reason) reason = 'Non spécifiée';
            const score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: membre.id,
                guild: message.guild.id,
                warner: message.author.id,
                reason: reason
                }
            const muteembed = new Discord.MessageEmbed()
            .setTitle('Warn')
            .setColor('#ff0000')
            .addField('Membre warn', `<@${score.user}>`)
            .addField('Warn par', message.author)
            .addField('Raison', reason)
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
                    

            message.channel.send(muteembed);
            client.setWarns.run(score)
        } else {
            message.reply("Vous n'avez pas le droit")
        }  
}