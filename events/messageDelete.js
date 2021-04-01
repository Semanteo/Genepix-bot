const {client} = require('../app');
client.on('messageDelete', message => {
    if(message.mentions.users.size === 0) return
    if (message.mentions.members.first().id != message.author.id) {
        if(message.author.id != client.user.id){
            message.channel.send(`${message.mentions.members.first()} tu as été ghost ping par <@${message.author.id}> 😉`)
        }
    }
});