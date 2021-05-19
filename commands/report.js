const Discord = require('discord.js');

module.exports = function (message) {
            let em = new Discord.MessageEmbed()
                .setAuthor("Comment faire un report")
                .setDescription("Allez sur le lien de [Report](https://forms.gle/BxFH6ZQz5ufvSmXD6) et complétez le formulaire puis la demande sera transmise aux modérateurs")
            message.channel.send(em)
}