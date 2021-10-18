const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports =  {
	name: "resetwarns",
	category: "admin",
	aliases: [],
	description: "Commande permettant de reset les warns d'un membre",
	usage: "{{prefix}}resetwarns {Membre}",
	data: new SlashCommandBuilder()
		.setName('resetwarns')
		.setDescription("Commande permettant de reset les warns d'un membre")
        .addUserOption(option => option.setName('target').setDescription('Select a user').setRequired(true)),
    async execute(client, interaction) {

		const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        const membre = interaction.options.getMember('target');

        if (!client.config.root.includes(interaction.user.id)) return await interaction.reply("Vous n'avez pas la permission");
        await interaction.reply(`<@${membre.id}> a eu ses warns reset`)
		channel.send(`<@${membre.id}> a eu ses warns reset`)
        client.clearWarns.run(membre.id)
}
};