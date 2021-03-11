const Discord = require('discord.js');

async function ping(message, client) {
    

    let embed = new Discord.MessageEmbed()
    .setTitle("🏓Ping")
    const m = await message.channel.send(embed)

    let nembed = new Discord.MessageEmbed()
    .setTitle("🏓Pong")
    .addField("**Message**", m.createdAt - message.createdAt + "ms")
    .addField("**API**", Math.round(client.ws.ping))
    m.edit(nembed);
};

module.exports.ping = ping;