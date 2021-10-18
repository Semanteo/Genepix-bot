const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
	name: "mutelist",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir la liste des personnes mute",
	usage: "{{prefix}}mutelist",
    data: new SlashCommandBuilder()
	.setName('mutelist')
	.setDescription("Commande permettant de voir la liste des personnes mute"),
    async execute(client, interaction) {

        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply("Vous n'avez pas la permission");
        let muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muet')
        if(!muteRole) return await interaction.reply("Personne n'as encore été mute sur votre serveur")
        var mute = [];
        interaction.guild.members.fetch().then(async fetched => {
            fetched.forEach(m => {
                if(m.roles.cache.some(role => role.id === '834351098151174165')) mute.push(m)
            })
        
            
        let embed = new MessageEmbed()
        .setTitle(`Membres mute de ${interaction.guild.name}`)
        .setColor(0xdb1111)
        .addField('Membres mutes', "Aucun membre n'est mute en ce moment")
        .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
        .setTimestamp()     
        if(!mute) return await interaction.reply({embeds: [embed]})  

        let nembed = new MessageEmbed()
        .setTitle(`Membres mute de ${interaction.guild.name}`)
        .setColor(0xdb1111)
        .addField('Membres mutes', mute.join('\n'))
        .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
        .setTimestamp()     
        await interaction.reply({embeds: [nembed]}); 
    });        
}
};