const Discord = require('discord.js');

module.exports = function (message, client, args) {
    const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");

        const membre = message.mentions.members.first()
        if(!membre) {
            return message.channel.send(`Veuillez mentionner la personne à ban.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        }
        const checkwarnsembed = new Discord.MessageEmbed()
        .setTitle(`Warns de ${membre.user.tag} - ${membre.id}`)
        .setColor('#ff0000')
        .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
        .setTimestamp()     
        const warns = sql.prepare("SELECT * FROM warns WHERE user = ?").all(membre.id);

        for(const data of warns){
            checkwarnsembed.addField(`\u200b`, `${client.users.cache.get(data.user)} à été warn par ${client.users.cache.get(data.warner)} pour : ${data.reason}`);
        }
        if(checkwarnsembed.fields.length === 0) {
            checkwarnsembed.addField(`\u200b`, `<@${membre.id}> n'as aucun warns`);
        }

            message.channel.send(checkwarnsembed)
}