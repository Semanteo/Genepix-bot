const Discord = require("discord.js");

module.exports = function (message, client) {
function checkDays(date) {
    let now = new Date();
    let diff = now.getTime() - date.getTime();
    let days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
message.guild.members.fetch().then(fetchedMembers => {
    const totalOnline = fetchedMembers.filter(member => member.presence.status === 'online');
    
    message.guild.members.fetch().then(fetchedMembers => {
        const totaldnd = fetchedMembers.filter(member => member.presence.status === 'dnd');
    
        
    let Bots = message.guild.members.cache.filter(member => member.user.bot);
const embed = new Discord.MessageEmbed()
        .setAuthor(`Name : ${message.guild.name}`, message.guild.iconURL())
        .addField("Server name", message.guild.name, true)
        .addField("Server ID", message.guild.id, true)
        .addField("\u200b", "\u200b")
        .addField("Server region", message.guild.region, true)
        .addField("Server owner", `${message.guild.owner}`, true)
        .addField("Server verification Level", message.guild.verificationLevel, true)
        .addField("Server announcement channels", message.guild.channels.cache.filter(m => m.type === 'news').size, true)
        .addField("Server text channels", message.guild.channels.cache.filter(m => m.type === 'text').size, true)
        .addField("Server voice channels", message.guild.channels.cache.filter(m => m.type === 'voice').size, true)
        .addField("Server emojis", message.guild.emojis.cache.size, true)
        .addField("Server Bots", Bots.size, true)
        .addField("Server online members", totalOnline.size, true)
        .addField("Server total members", message.guild.memberCount, true)
        .addField("Server roles count", message.guild.roles.cache.size, true)
        .addField("Server boosts count", message.guild.premiumSubscriptionCount, true)
        .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
        .setThumbnail(message.guild.iconURL())
    message.channel.send(embed);
})})}