const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config')
module.exports = {
	name: "listcommands",
	category: "admin",
	aliases: [],
	description: "Commande permettant de voir le ping du bot",
	usage: "{{prefix}}ping",
	data: new SlashCommandBuilder()
	.setName('listcommands')
	.setDescription('Commande permettant de list les commands')
    .addStringOption(option => option.setName('input').setDescription('La catégorie de commande à afficher').setRequired(true).addChoice('Privée', "private").addChoice('Publique', "public")),
	async execute(client, interaction) {
        const query = interaction.options.getString('input');
		let embed = new MessageEmbed()
		.setTitle("Liste")
        .setDescription('Commandes list')
		
        
        var commandsstaff = []
        let commandsList = await interaction.guild.commands.fetch();
        await commandsList.forEach(slashCommand => {
            interaction.guild.commands.permissions.fetch(slashCommand.name).then(permissions => { 
                const ar = Array.from(permissions)
                var perm = ar.find(x => x[0] === slashCommand.id)
                const firstId = perm[1][0].id
                console.log(perm[1][0].id)
                if(firstId === "789670704911613992"){
                    if(perm[1][0].permission === false){
                        commandsstaff.push(slashCommand.name)
                    }
                }
                else {
                    if(perm[1][1].permission === false){
                        commandsstaff.push(slashCommand.name)
                    }
                }
                 })     
                 console.log(commandsstaff)    
            });
       
           await interaction.reply({embeds: [embed]})
	},
};