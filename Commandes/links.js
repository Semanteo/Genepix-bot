const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: "links",
	category: "bot",
	aliases: [],
	description: "Commande permettant de voir les liens concernant le bot",
	usage: "{{prefix}}links",
	data: new SlashCommandBuilder()
	.setName('links')
	.setDescription('Commande permettant de voir les liens concernant le bot'),
	async execute(client, interaction) {
		let embed = new MessageEmbed()
		.setAuthor('Genepix bot', client.user.displayAvatarURL())
    	.setTitle('Les liens relatifs à Genepix et au bot')
		let tiktok = new MessageButton()
                    	.setStyle('LINK')
                        .setLabel('Tiktok de Genepix')
						.setURL('https://www.tiktok.com/@genepixontiktok?lang=fr')
						.setEmoji('911921057408114698');

        let ifi = new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Site de Genepix')
						.setURL('https://ifi.ovh/')
						.setEmoji('911921337004605490');

	    let gitgen = new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Github de Genepix')
						.setURL('https://github.com/GenepixOnGithub')
						.setEmoji('819244316430041088');

		let gitsem = new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Github de Semanteo')
						.setURL('https://github.com/Semanteo')
						.setEmoji('819244316430041088');

		let repobot = new MessageButton()
                        .setStyle('LINK')
                        .setLabel('Repository du bot')
						.setURL('https://github.com/Semanteo/Genepix-bot')
						.setEmoji('🤖');

                        let rowAwait = new MessageActionRow()
                            .addComponents(tiktok, ifi, gitgen);

						let row = new MessageActionRow()
                            .addComponents(gitsem, repobot);
		
		await interaction.reply({embeds: [embed], components: [rowAwait, row]});
	},
};