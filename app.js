const Discord = require('discord.js');
const client = new Discord.Client();
const TikTokScraper = require('tiktok-scraper');
const auth = require('./auth.json');
const {convertTime} = require("./utils/function.js");
const SQLite = require('better-sqlite3');
const user = require('tiktok-scraper');
const sql = new SQLite('./scores.sqlite');

client.on("ready", () => {

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {

        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, java INTEGER, python INTEGER, rust INTEGER, discordjs INTEGER, discordpy INTEGER, c INTEGER, cplus INTEGER, csharp INTEGER, javascript INTEGER, html INTEGER, php INTEGER, sys INTEGER, bdd INTEGER, arduino INTEGER, lua INTEGER, seo INTEGER, asm INTEGER, warns INTEGER);").run();

        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    // REATE OR REPLACE - Supports that syntax is Oracle.
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

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    }
});

client.on("message", message => {
    if (message.author.id === client.user.id) return
    /*let blacklisted = ['ptn', 'fdp', 'ntm', 'connard', 'connasse', 'pute', 'salope'];

    for (var i in blacklisted) {
      if(message.content.toLowerCase().includes(blacklisted[i].toLowerCase())){
      const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
      message.delete();
      message.reply("Attention mot interdit!").then(msg => msg.delete({timeout: 4000})).catch(console.error);
      channel.send(`[LOG] ${message.author.tag} a utilisé un mot interdit (${blacklisted[i].toLowerCase()} dans le salon <#${message.channel.id}>)`)
      }
    }*/

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
    const args = message.content.slice(auth.prefix.length).trim().split(" ");
    const command = args.shift().toLowerCase();
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

    if (command === "lb") {
        const java = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY java DESC LIMIT 1;").all(message.guild.id);
        const javascript = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY javascript DESC LIMIT 1;").all(message.guild.id);
        const python = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY python DESC LIMIT 1;").all(message.guild.id);
        const rust = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY rust DESC LIMIT 1;").all(message.guild.id);
        const discordjs = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY discordjs DESC LIMIT 1;").all(message.guild.id);
        const discordpy = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY discordpy DESC LIMIT 1;").all(message.guild.id);
        const c = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY c DESC LIMIT 1;").all(message.guild.id);
        const cplus = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY cplus DESC LIMIT 1;").all(message.guild.id);
        const csharp = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY csharp DESC LIMIT 1;").all(message.guild.id);
        const html = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY html DESC LIMIT 1;").all(message.guild.id);
        const php = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY php DESC LIMIT 1;").all(message.guild.id);
        const sys = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY sys DESC LIMIT 1;").all(message.guild.id);
        const bdd = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY bdd DESC LIMIT 1;").all(message.guild.id);
        const arduino = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY arduino DESC LIMIT 1;").all(message.guild.id);
        const lua = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY lua DESC LIMIT 1;").all(message.guild.id);
        const seo = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY seo DESC LIMIT 1;").all(message.guild.id);
        const asm = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY asm DESC LIMIT 1;").all(message.guild.id);

        const embed = new Discord.MessageEmbed()
            .setTitle("Référents")
            .setAuthor(client.user.username, client.user.displayAvatarURL())
            .addFields({
                name: "Exemple: \nLangage",
                value: `<:embed:801174015406374933> @Pseudo du référent • **Nombre** d'aides`,
                inline: false
            })
            .setColor(0x020000);

        for (const data of javascript) {
            embed.addFields({
                name: "<:js:791680343698309121> Javascript",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.javascript}** aides`,
                inline: false
            });
        }
        for (const data of python) {
            embed.addFields({
                name: "<:python:791680344272666624> Python",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.python}** aides`,
                inline: false
            });
        }
        for (const data of java) {
            embed.addFields({
                name: "<:java:792105873915904030> Java",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.java}** aides`,
                inline: false
            });
        }
        for (const data of rust) {
            embed.addFields({
                name: "<:rust:807948690035441685> Rust",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.rust}** aides`,
                inline: false
            });
        }
        for (const data of discordjs) {
            embed.addFields({
                name: "<:discordjs:807948702328160257> Discord.js",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.discordjs}** aides`,
                inline: false
            });
        }
        for (const data of discordpy) {
            embed.addFields({
                name: "<:discordpy:807948674063400960> Discord.py",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.discordpy}** aides`,
                inline: false
            });
        }
        for (const data of c) {
            embed.addFields({
                name: "<:c_:791659815906705438> C",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.c}** aides`,
                inline: false
            });
        }
        for (const data of cplus) {
            embed.addFields({
                name: "<:cplus:791659815990591538> C++",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.cplus}** aides`,
                inline: false
            });
        }
        for (const data of csharp) {
            embed.addFields({
                name: "<:csharp:791680343886921728> C#",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.csharp}** aides`,
                inline: false
            });
        }
        for (const data of html) {
            embed.addFields({
                name: "<:htmlcss:807948674184642590> HTML/CSS",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.html}** aides`,
                inline: false
            });
        }
        for (const data of php) {
            embed.addFields({
                name: "<:php:792105887661555712> PHP",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.php}** aides`,
                inline: false
            });
        }
        for (const data of sys) {
            embed.addFields({
                name: "<:sysadmin:807948673655898172> Sys-Admin",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.sys}** aides`,
                inline: false
            });
        }
        for (const data of bdd) {
            embed.addFields({
                name: "<:db:807948694430547998> bdd",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.bdd}** aides`,
                inline: false
            });
        }
        for (const data of arduino) {
            embed.addFields({
                name: "<:Arduino:807948681382199316> Arduino/Raspberry",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.arduino}** aides`,
                inline: false
            });
        }
        for (const data of lua) {
            embed.addFields({
                name: "<:lua:808287061631041566> Lua",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.lua}** aides`,
                inline: false
            });
        }
        for (const data of seo) {
            embed.addFields({
                name: "<:seo:807948680879407106> SEO",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.seo}** aides`,
                inline: false
            });
        }
        for (const data of asm) {
            embed.addFields({
                name: "<:asm:807948700777054218> ASM",
                value: `<:embed:801174015406374933> ${client.users.cache.get(data.user)} • **${data.asm}** aides`,
                inline: false
            });
        }
        return message.channel.send({embed});
    }
    if (command === "rank" || command === "lvl" || command === "level") {
        const membre = message.mentions.members.first() || message.member;

        let userscore = client.getScore.get(membre.id, message.guild.id);

        if (!userscore) return message.reply(`Nous n'avons pas trouvé ${membre.user.tag}`)
        const embed = new Discord.MessageEmbed()
            .setAuthor(membre.user.username, membre.user.displayAvatarURL({dynamic: true}))
            .addFields({name: "Votre nombre d'aides", value: "\u200b"})
            .setColor(0x020000)
        if (userscore.javascript !== 0) {
            embed.addFields({
                name: `<:js:791680343698309121> Javascript`,
                value: `<:embed:801174015406374933> **${userscore.javascript}** aides`,
                inline: false
            })
        }
        if (userscore.python !== 0) {
            embed.addFields({
                name: `<:python:791680344272666624> Python`,
                value: `<:embed:801174015406374933> **${userscore.python}** aides`,
                inline: false
            })
        }
        if (userscore.java !== 0) {
            embed.addFields({
                name: `<:java:792105873915904030> Java`,
                value: `<:embed:801174015406374933> **${userscore.java}** aides`,
                inline: false
            })
        }
        if (userscore.rust !== 0) {
            embed.addFields({
                name: `<:rust:807948690035441685> Rust`,
                value: `<:embed:801174015406374933> **${userscore.rust}** aides`,
                inline: false
            })
        }
        if (userscore.discordjs !== 0) {
            embed.addFields({
                name: `<:discordjs:807948702328160257> Discord.js`,
                value: `<:embed:801174015406374933> **${userscore.discordjs}** aides`,
                inline: false
            })
        }
        if (userscore.discordpy !== 0) {
            embed.addFields({
                name: `<:discordpy:807948674063400960> Discord.py`,
                value: `<:embed:801174015406374933> **${userscore.discordpy}** aides`,
                inline: false
            })
        }
        if (userscore.c !== 0) {
            embed.addFields({
                name: `<:c_:791659815906705438> C`,
                value: `<:embed:801174015406374933> **${userscore.c}** aides`,
                inline: false
            })
        }
        if (userscore.cplus !== 0) {
            embed.addFields({
                name: `<:cplus:791659815990591538> C++`,
                value: `<:embed:801174015406374933> **${userscore.cplus}** aides`,
                inline: false
            })
        }
        if (userscore.csharp !== 0) {
            embed.addFields({
                name: `<:csharp:791680343886921728> C#`,
                value: `<:embed:801174015406374933> **${userscore.csharp}** aides`,
                inline: false
            })
        }
        if (userscore.html !== 0) {
            embed.addFields({
                name: `<:htmlcss:807948674184642590> HTML/CSS`,
                value: `<:embed:801174015406374933> **${userscore.html}** aides`,
                inline: false
            })
        }
        if (userscore.php !== 0) {
            embed.addFields({
                name: `<:php:792105887661555712> PHP`,
                value: `<:embed:801174015406374933> **${userscore.php}** aides`,
                inline: false
            })
        }
        if (userscore.sys !== 0) {
            embed.addFields({
                name: `<:sysadmin:807948673655898172> Sys-Admin`,
                value: `<:embed:801174015406374933> **${userscore.sys}** aides`,
                inline: false
            })
        }
        if (userscore.bdd !== 0) {
            embed.addFields({
                name: `<:db:807948694430547998> bdd`,
                value: `<:embed:801174015406374933> **${userscore.bdd}** aides`,
                inline: false
            })
        }
        if (userscore.arduino !== 0) {
            embed.addFields({
                name: `<:Arduino:807948681382199316> Arduino/Raspberry`,
                value: `<:embed:801174015406374933> **${userscore.arduino}** aides`,
                inline: false
            })
        }
        if (userscore.lua !== 0) {
            embed.addFields({
                name: `<:lua:808287061631041566> Lua`,
                value: `<:embed:801174015406374933> **${userscore.lua}** aides`,
                inline: false
            })
        }
        if (userscore.seo !== 0) {
            embed.addFields({
                name: `<:seo:807948680879407106> SEO`,
                value: `<:embed:801174015406374933> **${userscore.seo}** aides`,
                inline: false
            })
        }
        if (userscore.asm !== 0) {
            embed.addFields({
                name: `<:asm:807948700777054218> ASM`,
                value: `<:embed:801174015406374933> **${userscore.asm}** aides`,
                inline: false
            })
        }
        if (userscore.asm === 0 && userscore.seo === 0 && userscore.lua === 0 && userscore.arduino === 0 && userscore.bdd === 0 && userscore.sys === 0 && userscore.php === 0 && userscore.html === 0 && userscore.csharp === 0 && userscore.cplus === 0 && userscore.c === 0 && userscore.discordpy === 0 && userscore.discordjs === 0 && userscore.rust === 0 && userscore.java === 0 && userscore.python === 0 && userscore.javascript === 0) {
            embed.addFields({name: `Aucune aides`, value: `<:embed:801174015406374933>`, inline: false})
        }
        return message.channel.send({embed});
    }
    if (command === "infos" || command === "help") {
        const args = message.content.slice(auth.prefix.length).trim().split(" ");
        if (!args[1]) {

            let info = new Discord.MessageEmbed()
                .setAuthor("Informations sur moi", client.user.displayAvatarURL())
                .addField("🙍️ **__Infos__**", `Bot de modération qui enregistre le nombre d'aides de chaque personnes du serveur`)
                .addField("⏲️ **__Uptime__**", `${convertTime(process.uptime())}`)
                .addField("✏️ **__Commandes disponibles__**", `**- g!lb**\n**- g!rank/g!level/g!lvl**\n**- g!tiktok**\n**- g!vote**\n**- g!help/g!infos**\nPour les informations sur la commande : g! + help/infos + nom de la commande`)
                .addField("❓ **__A quoi je sers ?__**", `Genepix sert à comptabiliser le nombre d'aides apportées par les utilisateurs du serveur`)
                .addField("❓ **__Pour quoi faire ?__**", `Ce système permet aux personnes sur le serveur de connaitre le \"référent\" pour chaque langage de programmation. Cela permet aux personnes qui ont besoin d'aide d'avoir une personne à qui se référer en cas de problèmes`)
                .addField("🤔 **__Comment ça marche ?__**", `Les personnes qui se sont faites aidées réagissent au message de la personne qui a aidé afin de lui faire augmenter son nombre d'aides dans le langage concerné`)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                .setColor(0x8186dc);
            message.channel.send(info);
        } else {
            if (args[1] === "rank" || args[1] === "level" || args[1] === "lvl") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande rank/level/lvl", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant de voir votre nombre d'aides dans chaque langage ou celui d'une autre personne`)
                    .addField("⚙️ **__Utilisation__**", `g! + rank/level/lvl + [mention de l'utilisateur]\nCe qui est entre crochets et optionnel`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "lb") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande lb", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant de voir les infos concernant le tiktok de Genepix`)
                    .addField("⚙️ **__Utilisation__**", `g! + lb`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "tiktok") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande tiktok", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant d'afficher les référents de chaque langage`)
                    .addField("⚙️ **__Utilisation__**", `g! + tiktok`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "vote") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande vote", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant d'augmenter le nombre d'aides d'une personne dans le langage concerné`)
                    .addField("⚙️ **__Utilisation__**", `g! + vote + {@mention} + {langage}\nCe qui est entre accolades est optionnel`)
                    .addField("✏️ **__Langages disponibles__**", `java, python, rust, javascript, discordjs, discordpy, c, c++, c#, html, php, sys, bdd, arduino, lua, seo, asm`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
        }
    }
    if (command === "warn") {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        const userscore = client.getScore.get(membre.id, message.guild.id);
        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            message.channel.send(`<@${userscore.user}> a été warn`)
            userscore.warns++
            client.setScore.run(userscore)
        } else {
            message.reply("Vous n'avez pas le droit")
        }
    }
    if (command === "update") {
        const args = message.content.slice(auth.prefix.length).trim().split(" ");
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            if (args[1] === '1') {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Nouvelle update`)
                    .addField("⚠️**__Update__**", `Nouvelle commande ajoutée : g!vote.\nFaîtes \`g!help vote\` dans <#791679673599131648> pour plus d'informations !`, true)
                    .setTimestamp(new Date)
                message.channel.send(embed).then(msg => msg.pin())
            }
            if (args[1] === '2') {
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Nouvelle update`)
                    .addField("⚠️**__Update__**", `Github ajouté : https://github.com/Semanteo/Genepix-bot !`, true)
                    .setTimestamp(new Date)
                message.channel.send(embed).then(msg => msg.pin())
            }
        } else {
            message.reply("Vous n'avez pas le droit")
        }
    }
    if (command === "warns") {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        const userscore = client.getScore.get(membre.id, message.guild.id);
        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            message.channel.send(`<@${userscore.user}> a été warn \`${userscore.warns}\` fois`)

        } else {
            message.reply("Vous n'avez pas le droit")
        }
    }
    if (command === "resetwarn") {
        const membre = message.mentions.members.first()
        const role = message.guild.roles.cache.find(role => role.id === '791681762124103721')

        const userscore = client.getScore.get(membre.id, message.guild.id);
        if (message.member.roles.cache.has(role) || message.author.id === '398126558432329728' || message.author.id === '533575225556598804') {
            message.channel.send(`<@${userscore.user}> a eu ses warns reset`)
            while (userscore.warns != 0) {
                userscore.warns--
            }

            client.setScore.run(userscore)
        } else {
            message.reply("Vous n'avez pas le droit")
        }

    }
    if (command === "restart") {
        message.channel.send('Restarting...')
            .then(client.destroy())
            .then(client.login(auth.token))
            .then(message.channel.send('👋 Je suis de retour'))

    }
    if (command === "shutdown") {
        message.channel.send('Shutting down...')
            .then(msg => client.destroy())
        console.log("Shutdown")
    }
    if (command === "vote") {
        const args = message.content.slice(auth.prefix.length).trim().split(" ");
        const membre = message.mentions.members.first()
        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        let score = client.getScore.get(membre.id, message.guild.id);
        if (message.author.id === membre.id) return
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

            if (args[2] === 'java') {
                score.java++;
                client.setScore.run(score);

                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'python') {
                score.python++;
                client.setScore.run(score);

                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'rust') {
                score.rust++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'discordjs') {
                score.discordjs++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'discordpy') {
                score.discordpy++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c') {
                score.c++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c++') {
                score.cplus++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'javascript') {
                score.javascript++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'c#') {
                score.csharp++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'html') {
                score.html++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'php') {
                score.php++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'sys') {
                score.sys++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'bdd') {
                score.bdd++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'arduino') {
                score.arduino++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'lua') {
                score.lua++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'seo') {
                score.seo++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
            if (args[2] === 'asm') {
                score.asm++;
                client.setScore.run(score);
                message.channel.send(`Aide pour <@${membre.user.id}> enregistrée`)
                channel.send(`[LOG] : ${message.author.tag} a ajouté une aide à ${membre.user.tag} dans le salon <#${message.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${message.channel.id}/${message.id}`)
            }
        }
    }
    if (command === "tiktok") {
        (async () => {
            try {
                const user = await TikTokScraper.getUserProfileInfo('genepixontiktok');
                let em = new Discord.MessageEmbed()
                    .setAuthor("Infos sur la chaine tiktok de Genepix")
                    .addField("Description", user.user.signature)
                    .addField("Abonnés", user.stats.followerCount)
                    .addField("Abonnements", user.stats.followingCount)
                    .addField("Likes", user.stats.heart)
                    .addField("Nombre de vidéos", user.stats.videoCount)
                    .addField("Lien de la description", user.user.bioLink.link)
                    .addField("Lien de la chaine", 'https://www.tiktok.com/@genepixontiktok?lang=fr')
                message.channel.send(em)
            } catch (error) {
                console.log(error);
            }
        })();
    }
});

client.on('messageReactionAdd', (reaction, user) => {
    let message = reaction.message, emoji = reaction.emoji;
    let member = reaction.message.guild.members.cache.find(member => member.id === user.id);
    let score;
    const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
    if (reaction.message.author.id === user.id) return

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