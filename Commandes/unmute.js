const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =  {
	name: "unmute",
	category: "admin",
	aliases: [],
	description: "Commande permettant de unmute un membre",
	usage: "{{prefix}}unmute {membre}",
    data: new SlashCommandBuilder()
	.setName('unmute')
	.setDescription("Commande permettant de unmute un membre")
    .addUserOption(option => option.setName('target').setDescription('Mentionner un user').setRequired(true)),
    async execute(client, interaction) {
    
        const muteRole = interaction.guild.roles.cache.find(role => role.name === 'Muet')
        const membre = interaction.options.getMember('target');
        if(!membre.roles.cache.has(muteRole.id)) return await interaction.reply({content: `Cet utilisateur n'est pas mute`, ephemeral:true})
        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply({content:"Vous n'avez pas la permission", ephemeral: true});

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('warn_reaso')
                .setPlaceholder('Rien de sélectionné')
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions([
                    {
                        label: 'Temps',
                        description: 'Le membre a été mute le temps qu\'il faut',
                        value: 'Temps',
                    },
                    {
                        label: 'Décision',
                        description: 'Le membre a été unmute suite à une décision du staff',
                        value: 'Décision du staff',
                    },
                    {
                        label: 'Autre',
                        description: 'Le membre a été unmute pour une autre raison',
                        value: 'Autre',
                    },
                ]),
        );
        await interaction.reply({content: "Veuillez choisir la raison du unmute", components: [row]});
    
        const filter = i => {
            return i.user.id === interaction.user.id;
        };
        
        interaction.channel.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', time: 60000 })
            .then(async interaction => {
                let reason = []
            if(interaction.values) {
                for(var i = 0; i < interaction.values.length; i++){
                reason.push(interaction.values[i]);
                }
            }
            
            
            
            await membre.roles.remove(muteRole)
    
                const muteembed = new MessageEmbed()
                .setTitle('Unmute')
                .setColor('#ff0000')
                .setThumbnail(membre.user.displayAvatarURL())
                .addField('Membre Unmute', `<@${membre.user.id}>`)
                .addField('Unmute par', `<@${interaction.user.id}>`)
                .addField('Raison', reason.join(", "))
                .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
                .setTimestamp()     
                const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
                channel.send({embeds: [muteembed]})
                await interaction.reply({embeds: [muteembed]});
        }).catch(err => console.log(`No interactions were collected.`, err));  
}
};