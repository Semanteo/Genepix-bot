const {MessageEmbed} = require("discord.js");
const Command = require("../utils/commandHandler.js");

module.exports = class Ping extends Command {
    constructor() {
        super({
            name: "ping",
            category: "bot",
            aliases: [],
            description: "Commande permettant de voir le ping du bot",
            usage: (prefix) => `${prefix}ping`
        });
    }

    async run(message, client) {
        let embed = new MessageEmbed()
            .setTitle("🏓Ping");
        const m = await message.channel.send(embed);

        let nEmbed = new MessageEmbed()
            .setTitle("🏓Pong")
            .addField("**Message**", m.createdAt - message.createdAt + "ms")
            .addField("**API**", Math.round(client.ws.ping));

        await m.edit(nEmbed);
    }
};