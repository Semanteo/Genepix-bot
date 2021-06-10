const emojis = require("../utils/emojis");
const {getScore} = require("../utils/function");

module.exports = function (client, reaction, user) {
    const message = reaction.message;
    const emoji = reaction.emoji;
    const channel = client.channels.cache.get("812304842647273534");

    if (reaction.message.author.id === user.id || reaction.message.channel.id === "792108846658355201") {
        return;
    }

    if (message.guild && !user.bot) {
        let score = getScore(client, reaction.message.author.id, reaction.message.guild.id);

        Object.keys(emojis).forEach((e) => {
            if(emoji.id === emojis[e].id) {
                score[e]--;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`);
            }
        });
    }
};