const Command = require("../utils/commandHandler.js");
const Discord = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');
module.exports = {
    name: "warn",
	category: "admin",
	aliases: [],
	description: "Commande permettant de mettre un avertissement à un membre",
	usage: "{{prefix}}warn {membre} <reaison>",
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription("Commande permettant de mettre un avertissement à un membre")
        .addUserOption(option => option.setName('target').setDescription('Mentionner un user').setRequired(true)),

	async execute(client, interaction) {
        
        const membre = interaction.options.getMember('target');
        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply({content:"Vous n'avez pas la permission", ephemeral: true});
        if(!membre) {
            return await interaction.reply({content:`Veuillez mentionner la personne à warn.`, ephemeral: true})
        }
        if(client.config.root.includes(membre.user.id)) return await interaction.reply("Vous n'avez pas la permission de warn un bg du serveur");
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
        await interaction.reply({content: "Veuillez choisir la raison du warn", components: [row]});
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
            const score = {
                id: `${interaction.guild.id}-${interaction.user.id}`,
                user: membre.id,
                guild: interaction.guild.id,
                warner: interaction.user.id,
                reason: reason.join(", ")
                }
            const muteembed = new MessageEmbed()
            .setTitle('Warn')
            .setColor('#ff0000')
            .addField('Membre warn', `<@${score.user}>`)
            .addField('Warn par', `<@${interaction.user.id}>`)
            .addField('Raison', reason.join(", "))
            .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
            .setTimestamp()     
            const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
            channel.send({ embeds: [muteembed]})
            client.setWarns.run(score)
            await interaction.update({ embeds: [muteembed], components: [] });
        })
            .catch(err => console.log(`No interactions were collected.`, err));
            
    }
};