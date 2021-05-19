const Discord = require('discord.js');

module.exports = function (message, client, args) {
    
const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
    const dev = client.getDevStatus.get()
    if (!message.author.id === '398126558432329728') return message.channel.send("Vous n'avez pas la permission");

    if(args[1] == 'on' && dev.devmode != 'true') {
        client.clearStatus.run()
        client.setDevStatusTrue.run()
        message.channel.send('Mode développement activé')
        channel.send(`[LOG] : ${message.author.tag} a activé le mode développement\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
    }
    if(args[1] == 'on' && dev.devmode === 'true') {
        message.channel.send('Mode développement déjà activé')
    }

    if(args[1] == 'off' && dev.devmode != 'false') {
        client.clearStatus.run()
        client.setDevStatusFalse.run()
        message.channel.send('Mode développement désactivé')
        channel.send(`[LOG] : ${message.author.tag} a désactivé le mode développement\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
    }
    if(args[1] == 'off' && dev.devmode === 'false') {
        message.channel.send('Mode développement déjà désactivé')
    }
}