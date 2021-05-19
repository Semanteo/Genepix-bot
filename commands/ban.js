const Discord = require('discord.js');

module.exports = function (message, client, args) {
    const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");

    const membre = message.mentions.members.first() || args[1]
    if(!membre) {
        return message.channel.send(`Veuillez mentionner ou mettre l'id de la personne à ban.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
    if(message.mentions.members.first()) {
    var bUser = message.guild.members.cache.find(b => b.user.id === membre.id)
    }
    if(!message.mentions.members.first() && args[1]) {
        var bUser = message.guild.members.cache.find(b => b.user.id === membre)
        }

    if(!bUser) {
        return message.channel.send(`Veuillez rentrer l'ID ou mentionner la personne à ban.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }

    if(!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) return message.channel.send("Le bot n'as pas la permission !").then(msg => msg.delete({timeout: 4000})).then(message.delete());

    
    bUser.ban().then(member => { 
        let reason = args.slice(2).join(' ');
        if(!reason) reason = 'Non spécifiée';
        const banembed = new Discord.MessageEmbed()
            .setTitle('Membre Banni')
            .setColor('#ff0000')
            .setThumbnail(bUser.user.displayAvatarURL())
            .addField('Membre banni', bUser)
            .addField('Banni par', message.author)
            .addField('Raison', reason)
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
        message.channel.send(banembed);
    });
}