const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config')
module.exports = {
	name: "loadcommands",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir le ping du bot",
	usage: "{{prefix}}ping",
	data: new SlashCommandBuilder()
	.setName('loadcommands')
	.setDescription('Commande permettant de load les commands'),
	async execute(client, interaction) {
		let embed = new MessageEmbed()
		.setTitle("Load")
        .setDescription('Commandes load')
		
        
        const commands = []
        let commandsList = await interaction.guild.commands.fetch();
        await commandsList.forEach(slashCommand => {
            commands.push({ name: slashCommand.name, value: slashCommand.name })
        })
           const opt = [{
               type: 3,
               name: 'input',
               description: "La commande",
               choices: commands,
               required: true
           }]

           await client.api.applications(client.user.id).guilds(config.bot.guildId).commands.post({data: {
               name: 'setperm',
               description: 'Commande permettant de set les permissions',
               options: opt
           }})

           await client.api.applications(client.user.id).guilds(config.bot.guildId).commands.post({data: {
            name: 'unsetperm',
            description: 'Commande permettant de set les commandes publiques',
            options: opt
        }})

           await interaction.reply({embeds: [embed]})
	},
};