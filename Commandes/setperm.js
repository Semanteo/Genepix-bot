const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	name: "setperm",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir le ping du bot",
	usage: "{{prefix}}ping",
    data: {name: 'setperm'},
	async execute(client, interaction) {
        const query = interaction.options.getString('input');
		let embed = new MessageEmbed()
		.setTitle("Setperms")
        .setDescription(`La commande ${query} est passée privée au staff`)
		await interaction.reply({embeds: [embed]})
        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        channel.send({ embeds: [embed], content: null})
        const permissions2 = {
            id: interaction.guild.roles.everyone.id,
            type: 'ROLE',
            permission: false,
        };
        const permissions1 =  {
            id: '792889476091215892',
            type: 'ROLE',
            permission: true,
        };
        
        let commandsList = await interaction.guild.commands.fetch();
        
        await commandsList.forEach(slashCommand => {
           if(slashCommand.name === query){
            //set the permissions for each slashCommand
            interaction.guild.commands.permissions.add({
                command: slashCommand.id,
                permissions: [permissions1, permissions2]
            });
        }
        });
	},
};

