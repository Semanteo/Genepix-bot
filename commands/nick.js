const Discord = require('discord.js');
const fs = require('fs');

module.exports = function (message, client) {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')
        const role2 = message.guild.roles.cache.find(role => role.id === '792889476091215892')  
        //if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.member.roles.cache.has(role2))) return message.channel.send("Vous n'avez pas la permission");
        if(!membre) {
            return message.channel.send(`Veuillez mentionner la personne à qui enlevé les charactères spéciaux.`).then(msg => msg.delete({timeout: 4000})).then(message.delete());
        }
        li = []
        var m = membre.nickname;
        fs.readFileSync('./decancer.txt', 'utf-8', (err) => {

            if (!err) return;
        
            console.error(err)
        
        }).split('\n').forEach(function(line){li.push(line.replace('\r', ''))})
        for(var i = 0; i<li.length; i++){
            const characters = li[i].split(',');    
            m = m.replace(characters[0], characters[1])       
        }
        membre.setNickname(m).catch(console.error)
        message.channel.send(`Le pseudo de ${membre} a bien été enlevé des charactères spéciaux`)
}