const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "nitrodel",
    category: "admin",
    aliases: [],
    description: "Commande permettant de supp les msgs nitro/scam",
    usage: "{{prefix}}nitrodel + {Membre}",
	data: new SlashCommandBuilder()
		.setName('nitrodel')
		.setDescription("Commande permettant de supp les msgs nitro/scam")
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),

	async execute(client, interaction) {
        const membreto = interaction.options.getMember('target');
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muet')
        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply({content:"Vous n'avez pas la permission", ephemeral: true});
 
        if(client.config.root.includes(membreto.user.id)) return await interaction.reply("Vous n'avez pas la permission de clear un admin serveur");
        await membreto.roles.add(muteRole)
            interaction.guild.channels.cache.forEach(channel => {
            if(channel.type == "GUILD_TEXT"){
                channel.messages.fetch({limit: 20}).then(messages => {
                    messages.forEach(message => {
                        if(message.author.id == membreto.user.id){
                            message.delete();
                        }
                    }).catch(console.error);
                }).catch(console.error);
            }
        })
            const embed = new MessageEmbed()
            .setTitle('Clear et Mute')
            .setColor('#ff0000')
            .setThumbnail(membreto.user.displayAvatarURL())
            .addField('Membre clear et mute', `<@${membreto.user.id}>`)
            .addField('Clear et mute par', `<@${interaction.user.id}>`)
            .addField('Raison', 'Clear et Mute pour scam')
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
            const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
            channel.send({embeds: [embed]})
            await interaction.reply({ embeds: [embed] });
    
    }
};