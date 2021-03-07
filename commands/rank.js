const Discord = require('discord.js');

function rank(message, client) {
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
module.exports.rank = rank;