const Command = require("../utils/commandHandler.js");

module.exports = class ResetWarns extends Command {
    constructor() {
        super({
            name: "resetwarns",
            category: "admin",
            aliases: [],
            description: "Commande permettant de reset les warns d'un membre",
            usage: (prefix) => `${prefix}resetwarns <membre>`
        });
    }
    run(message, client) {
        const member = message.mentions.members.first();
        const role = message.guild.roles.cache.get("791681762124103721");
        const role2 = message.guild.roles.cache.get("792889476091215892");
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728" || message.member.roles.cache.has(role2.id))) {
            message.channel.send("Vous n'avez pas la permission");
            return;
        }
        message.channel.send(`<@${member.id}> a eu ses warns reset`);
        client.clearWarns.run(member.id);
    }
};