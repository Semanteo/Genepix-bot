module.exports = {
    name: 'messageReactionRemove',
    async execute(client, reaction, user) {
    let message = reaction.message, emoji = reaction.emoji;
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    let score;
    console.log("remove")
    const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
    if (reaction.message.author.id === user.id) return
    if(reaction.message.channel.id === '792108846658355201') return
    if (message.guild && !user.bot) {
        score = client.getScore.get(reaction.message.author.id, reaction.message.guild.id);
        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
                java: 0,
                python: 0,
                rust: 0,
                discordjs: 0,
                discordpy: 0,
                c: 0,
                cplus: 0,
                csharp: 0,
                javascript: 0,
                html: 0,
                php: 0,
                sys: 0,
                bdd: 0,
                arduino: 0,
                lua: 0,
                seo: 0,
                asm: 0
            }
        }
        if (emoji.id === '791680343698309121') {
            score.java--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '791680344272666624') {
            score.python--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '789670704911613992') {
            score.rust--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948702328160257') {
            score.discordjs--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948674063400960') {
            score.discordpy--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '791659815906705438') {
            score.c--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '791659815990591538') {
            score.cplus--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '791680343698309121') {
            score.javascript--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '791680343886921728') {
            score.csharp--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948674184642590') {
            score.html--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '792105887661555712') {
            score.php--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948673655898172') {
            score.sys--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948694430547998') {
            score.bdd--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948681382199316') {
            score.arduino--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '808287061631041566') {
            score.lua--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948680879407106') {
            score.seo--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
        if (emoji.id === '807948700777054218') {
            score.asm--;
            client.setScore.run(score);
            channel.send(`[LOG] : ${user.tag} a enlevé sa réaction avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
        }
    }
}
}