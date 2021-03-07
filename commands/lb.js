const Discord = require('discord.js');

function lb(message, client, sql) {
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
module.exports.lb = lb;