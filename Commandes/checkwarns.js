const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');
module.exports = {
    name: "checkwarns",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir les warns d'un membre",
	usage: "{{prefix}}checkwarns {Membre}",
	data: new SlashCommandBuilder()
		.setName('checkwarns')
		.setDescription("Commande permettant de voir les warns d'un membre")
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
	async execute(client, interaction, sql) {
		if (!config.root.includes(interaction.user.id)) return await interaction.reply({content: "Vous n'avez pas la permission", ephemeral: true});

        const membre = interaction.options.getMember('target');
        if(!membre) {
            return await interaction.reply({ content:`Veuillez mentionner la personne à check les warns.`, ephemeral: true})
        }
        const checkwarnsembed = new MessageEmbed()
        .setTitle(`Warns de ${membre.user.tag} - ${membre.id}`)
        .setColor('#ff0000')
        .setFooter(`Genepix | Version 1.0`, client.user.displayAvatarURL())
        .setTimestamp()     
        const warns = sql.prepare("SELECT * FROM warns WHERE user = ?").all(membre.id);

        for(const data of warns){
            checkwarnsembed.addField(`\u200b`, `${client.users.cache.get(data.user)} à été warn par ${client.users.cache.get(data.warner)} pour : ${data.reason}`);
        }
        if(checkwarnsembed.fields.length === 0) {
            checkwarnsembed.addField(`\u200b`, `<@${membre.id}> n'as aucun warns`);
        }

           await interaction.reply({embeds: [checkwarnsembed]})
    }

};