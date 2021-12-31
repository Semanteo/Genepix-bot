const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	name: "unsetperm",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir le ping du bot",
	usage: "{{prefix}}ping",
    data: {name: 'unsetperm'},
	async execute(client, interaction) {
        const query = interaction.options.getString('input');
		let embed = new MessageEmbed()
		.setTitle("Setperms")
        .setDescription(`La commande ${query} est passée publique`)
		await interaction.reply({embeds: [embed]})
        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        channel.send({ embeds: [embed]})
        const permissions2 = {
            id: interaction.guild.roles.everyone.id,
            type: 'ROLE',
            permission: true,
        };
        
        let commandsList = await interaction.guild.commands.fetch();
        
        await commandsList.forEach(slashCommand => {
           if(slashCommand.name === query){
            //set the permissions for each slashCommand
            interaction.guild.commands.permissions.add({
                command: slashCommand.id,
                permissions: [permissions2]
            });
        }
        });
	},
};

