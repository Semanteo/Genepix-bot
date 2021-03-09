const {client} = require('../app');
client.on('messageDelete', message => {
    if (message.mentions.members.first().id != message.author.id) {
        message.channel.send(`${message.mentions.members.first()} tu as été ghost ping par <@${message.author.id}> 😉`)
    }
});