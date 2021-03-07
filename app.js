const Discord = require('discord.js');
const client = new Discord.Client();
const TikTokScraper = require('tiktok-scraper');
const auth = require('./auth.json');
const {convertTime} = require("./utils/function.js");
const SQLite = require('better-sqlite3');
const user = require('tiktok-scraper');
const sql = new SQLite('./scores.sqlite');
const tik = require('./commands/tiktok.js');
const infos= require('./commands/help.js');
const lb = require('./commands/lb.js');
const rank = require('./commands/rank.js');
const vote = require('./commands/vote.js');
const warn = require('./commands/warn.js')
const update = require('./commands/update.js');
const warns = require('./commands/warns.js');
const resetwarn = require('./commands/resetwarn.js');

client.on("ready", () => {

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {

        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, java INTEGER, python INTEGER, rust INTEGER, discordjs INTEGER, discordpy INTEGER, c INTEGER, cplus INTEGER, csharp INTEGER, javascript INTEGER, html INTEGER, php INTEGER, sys INTEGER, bdd INTEGER, arduino INTEGER, lua INTEGER, seo INTEGER, asm INTEGER, warns INTEGER);").run();

        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");

    client.setScore = sql.prepare("REPLACE INTO scores (id, user, guild, java, python, rust, discordjs, discordpy, c, cplus, csharp, javascript, html, php, sys, bdd, arduino, lua, seo, asm, warns) VALUES (@id, @user, @guild, @java, @python, @rust, @discordjs, @discordpy, @c, @cplus, @csharp, @javascript, @html, @php, @sys, @bdd, @arduino, @lua, @seo, @asm, @warns);");
    setInterval(function () {
        client.user.setPresence({
            activity: {
                name: `les aides de ${client.users.cache.size} users, dans les ${client.channels.cache.size} channels de Genepix • g!help`,
                type: "WATCHING",
            }
        })
    }, 15000);
    {
        console.log("Je suis connecté !")
    }
});

client.on("message", message => {
    if (message.author.id === client.user.id) return

    if (message.channel.id === '789670704911613997' || message.channel.id === '811663466325868635') {
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        if (!(message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804')) {
            if (message.content.startsWith(auth.prefix)) return message.reply("Merci de faire les commandes dans <#791679673599131648> !")
        }
    }
    const hi = ["Salut", "Bonjour", "Slt"]
    const n = Math.floor(Math.random() * 10) + 1;
    for (const i in hi) {
        if (n === '10') {
            if (message.content.toLowerCase().includes(hi[i].toLowerCase())) {
                message.react('👋')
            }
        }
    }
    if (message.author.bot) return;
    let score;

    if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
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
                asm: 0,
                warns: 0
            }
        }
        client.setScore.run(score);
    }
    if (message.content.indexOf(auth.prefix) !== 0) return;
    let cmd = message.content.split(' ')[0];
    if (message.channel.type === "dm") return
    const args = message.content.slice(auth.prefix.length).trim().split(" ");
    if(cmd.startsWith(auth.prefix)) {
      cmd = cmd.slice(auth.prefix.length)
      switch(cmd) {
        case "tiktok":
          tik.tik(message, client)
        break;
        case "help":
            infos.infos(message, client, args)
        break;
        case "infos":
            infos.infos(message, client, args)
        break;
        case "lb":
            lb.lb(message, client, sql)
        break;
        case "rank":
            rank.rank(message, client)
        break;
        case "lvl":
            rank.rank(message, client)
        break;        
        case "level":
            rank.rank(message, client)
        break;
        case "vote":
            vote.vote(message, client, args)
        break;
        case "warn":
            warn.warn(message,client)
        break;
        case "update":
            update.update(message, args)
        break;
        case "warns":
            warns.warns(message, client)
        break;
        case "resetwarn":
            resetwarn.resetwarn(message, client)
        break;
    }
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    let score;
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
                asm: 0,
                warns: 0
            }
        }
        if (score.warns < 5) {

            if (emoji.id === '792105873915904030') {
                score.java++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '791680344272666624') {
                score.python++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '814794296817090600') {
                score.rust++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948702328160257') {
                score.discordjs++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948674063400960') {
                score.discordpy++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '791659815906705438') {
                score.c++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '791659815990591538') {
                score.cplus++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '791680343698309121') {
                score.javascript++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '791680343886921728') {
                score.csharp++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948674184642590') {
                score.html++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '792105887661555712') {
                score.php++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.id}> dans le salon <#${reaction.message.channel.id}>`)
            }
            if (emoji.id === '807948673655898172') {
                score.sys++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948694430547998') {
                score.bdd++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948681382199316') {
                score.arduino++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '808287061631041566') {
                score.lua++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948680879407106') {
                score.seo++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
            if (emoji.id === '807948700777054218') {
                score.asm++;
                client.setScore.run(score);
                channel.send(`[LOG] : ${user.tag} a réagit avec l'émoji ${emoji} sur le message de <@${reaction.message.author.tag}> dans le salon <#${reaction.message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${reaction.message.channel.id}/${reaction.message.id}`)
            }
        }
    }
});

client.on('messageReactionRemove', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    let score;
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
                asm: 0,
                warns: 0
            }
        }
        if (emoji.id === '792105873915904030') {
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
});
client.on('messageDelete', message => {
    if (message.mentions.members.first().id != message.author.id) {
        message.channel.send(`${message.mentions.members.first()} tu as été ghost ping par <@${message.author.id}> 😉`)
    }
});
client.login(auth.token);
