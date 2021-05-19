const Discord = require('discord.js');

module.exports = function links(message, client){
    let embed = new Discord.MessageEmbed()
    .setAuthor('Genepix bot', client.user.displayAvatarURL())
    .setTitle('Links')
    .addField("Links", "[Tiktok de Genepix](https://www.tiktok.com/@genepixontiktok?lang=fr) | [Site de Genepix](https://ifi.ovh/) | [Github de Genepix](https://github.com/GenepixOnGithub) | [Github du créateur](https://github.com/Semanteo) | [Github du bot](https://github.com/Semanteo/Genepix-bot)")
message.channel.send(embed)
}