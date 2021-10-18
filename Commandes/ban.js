const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
    name: "ban",
    category: "admin",
    aliases: [],
    description: "Commande permettant de bannir un membre",
    usage: "{{prefix}}ban + {Membre} + <raison>",
	data: new SlashCommandBuilder()
		.setName('ban')
		.setDescription("Commande permettant de bannir un membre")
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),

	async execute(client, interaction) {
        const membre = interaction.options.getUser('target');
        const membreto = interaction.options.getMember('target');
        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply({content:"Vous n'avez pas la permission", ephemeral: true});
 
        if(client.config.root.includes(membreto.user.id)) return await interaction.reply("Vous n'avez pas la permission de ban un admin serveur");
        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId('warn_reaso')
                .setPlaceholder('Rien de sélectionné')
                .setMinValues(1)
                .setMaxValues(3)
                .addOptions([
                    {
                        label: 'Propos injurieux',
                        description: 'Le membre a tenu des propos injurieux',
                        value: 'Propos injurieux',
                    },
                    {
                        label: 'Pub',
                        description: 'Le membre a fait sa pub',
                        value: 'Pub',
                    },
                    {
                        label: 'Image injurieuse',
                        description: 'Le membre a envoyé une/des image/s injurieuse/s',
                        value: 'Image/s injurieuse/s',
                    },
                    {
                        label: 'Spam/Flood',
                        description: 'Le membre a spam/flood le channel',
                        value: 'Spam/Flood',
                    },
                    {
                        label: 'Mentions sauvages',
                        description: 'Le membre a mentionner le haut staff sans raison valable ou a mentionner abusivement',
                        value: 'Mentions sauvages'
                    },
                    {
                        label: 'Nsfw',
                        description: 'Le membre a posté du contenu Nsfw',
                        value: 'Nsfw'
                        
                    },
                ]),
        );
        await interaction.reply({content: "Veuillez choisir la raison du ban", components: [row]});
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
            interaction.guild.members.ban(membre).then(async () => {
            const banembed = new MessageEmbed()
            .setTitle('Membre Banni')
            .setColor('#ff0000')
            .setThumbnail(membreto.user.displayAvatarURL())
            .addField('Membre ban', `<@${membreto.user.id}>`)
            .addField('Ban par', `<@${interaction.user.id}>`)
            .addField('Raison', reason.join(", "))
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
            const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
            channel.send({embeds: [banembed]})
            await interaction.update({ embeds: [banembed], components: [] });
        })
    })
            .catch(err => console.log(`No interactions were collected.`, err));
    
    }
};