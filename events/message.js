const Discord = require('discord.js')
const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');
const g = "791642103393812490";


module.exports = async function (client, message) {
    
    
    const inviter = (guild, code) => new Promise((resolve) => {
        guild.fetchInvites().then((inviter) => {
            resolve(inviter.some((value) => value[0] === code))
        })
    });

    const code = message.content.split('discord.gg/')[1];
    if (message.content.includes('discord.gg/')) {
        if (message.member && message.member.hasPermission('ADMINISTRATOR')) return;
        const Invite = await inviter(message.guild, code);
        if (!Invite) {
            message.delete()
            message.reply('Les liens ne sont pas autorisés')
        }
    }
    if (message.channel.id === g) {
        if (message.author.bot) return
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
    if (!message.guild || message.author.bot || !message.channel.permissionsFor(client.user.id).has("SEND_MESSAGES") || !message.content.startsWith(client.config.bot.prefix)) return;
    if (message.author.id === client.user.id) return
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
                voc: 0
            }
        }
        client.setScore.run(score);
    }
    const args = message.content.trim().slice(client.config.bot.prefix.length).split(/ +/g);
    const command = client.commands.get(args[0]) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(args[0]));
    
    if (!command) return;
            
try {
    command.run(message, client, args, sql);
} catch (err) {
    message.reply("il y a eu une erreur en essayant d'exécuter cette commande")
    console.log(err);
  }
            
};
