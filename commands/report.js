const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");

module.exports = class Report extends Command {
    constructor() {
        super({
            name: "report",
            category: "serveur",
            aliases: [],
            description: "Commande permettant de report quelqu'un",
            usage: (prefix) => `${prefix}report`
        });
    }

    async run(message) {
        let em = new MessageEmbed()
            .setAuthor("Comment faire un report")
            .setDescription("Allez sur le lien de [report](https://forms.gle/BxFH6ZQz5ufvSmXD6) et complétez le formulaire puis la demande sera transmise aux modérateurs");
        await message.channel.send(em);
    }
};