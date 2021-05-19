const Discord = require('discord.js')

module.exports = async function (message, client, args) {
    
    const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
    const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
    if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");


    const membre = message.mentions.members.first() || args[1]
        if(!membre) {
        return message.channel.send(`Veuillez mentionner la personne à unmute.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
    }
    if(message.mentions.members.first()) {
        var bUser = message.guild.members.cache.find(b => b.user.id === membre.id)
        }
        if(!message.mentions.members.first() && args[1]) {
            var bUser = message.guild.members.cache.find(b => b.user.id === membre)
            }
        if(!bUser) {
            return message.channel.send(`Erreur interne`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        }


    if(!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send("Le bot n'as pas la permission !")


    
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muet')
        if(!bUser.roles.cache.has(muteRole.id)) return message.channel.send(`Cet utilisateur n'est pas mute`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        await bUser.roles.remove(muteRole)
        const unmuteembed = new Discord.MessageEmbed()
            .setTitle('Unmute')
            .setColor('#ff0000')
            .setThumbnail(bUser.user.displayAvatarURL())
            .addField('Membre unmute', bUser)
            .addField('Unmute par', message.author)
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     

            message.channel.send(unmuteembed);    

}