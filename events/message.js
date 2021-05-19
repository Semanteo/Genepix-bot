const {client} = require('../app');
const Discord = require('discord.js')
const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');
const auth = require('../auth.json');
const commandeHelper = require('../utils/comandeHelper');
const g = "791642103393812490";

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
      const command = commandeHelper.getCommand(cmd)
      if (command){
          command.func(message, client, args, sql)
      }
    }
});

client.on('message', async message => {
    if (message.channel.id === g) {
      if(message.author.id !== '799936922939162635'){
        const idée = message.content
        const membre = message.member;
        let embed = new Discord.MessageEmbed()
        .setTitle(`Nouvelle idée de ${membre.user.tag}`)
        .setThumbnail(membre.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**Idée :** ${idée}`)
        .addField("\u200b", "Réagissez dans <#797472517647630377>")
        .setTimestamp(new Date)
        const c = await message.channel.send(embed).then(message.delete())
        await c.react('<:yes:812255443036274720>');
        await c.react('🤔');
        await c.react('<:no:829015744595099648>');
        }}
  });