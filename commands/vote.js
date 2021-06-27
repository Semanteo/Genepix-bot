const Command = require("../utils/commandHandler.js");
const { getScore } = require("../utils/function");
const emojis = require("../utils/emojis");

module.exports = class Vote extends Command {
    constructor() {
        super({
            name: "vote",
            category: "aides",
            aliases: [],
            description: "Commande permettant de rajouter des aides à un membre",
            usage: (prefix) => `${prefix}vote <member> <java | python | rust | javascript | discordjs | discordpy | c | c++ | c# | html | php | sys | bdd | arduino | lua | seo | asm>`
        });
    }
    async run(message, client, args) {
        const membre = message.mentions.members.first();
        if(!membre) {
            const msg = await message.channel.send("Veuillez mentionner la personne pour qui voter");
            msg.delete({timeout: 4000});
            return;
        }

        const channel = client.channels.cache.get("812304842647273534");

        if (message.author.id === membre.id) {
            return;
        }

        const score = getScore(client, message.author.id, message.guild.id);

        Object.keys(emojis).forEach(e => {
            if(args[2] === e) {
                score[e]++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée.`);
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`);
            }
        });
    }
};