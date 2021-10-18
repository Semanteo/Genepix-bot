const Command = require("../utils/commandHandler.js");
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const {convertTime} = require("../utils/function.js");
const os = require("os");
const { SlashCommandBuilder } = require('@discordjs/builders');
const config = require('../config.js');
module.exports = {
    name: "help",
	category: "admin",
	aliases: [],
	description: "Aide sur les commandes",
    usage: "{{prefix}}help",
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription("Aide sur les commandes")
        .addStringOption(option => option.setName('input').setDescription('Commande pour avoir l\'aide (Optionnel)')),
	async execute(client, interaction) {
        const query = interaction.options.getString('input');
    
        if (!query) {
            let type = [];
            client.commands.forEach(cmd => {
                if (!type.includes(cmd.category) && (config.root.includes(interaction.user.id) || cmd.category !== "admin")) {
                    type.push(cmd.category);
                }
            });
            let embed = new MessageEmbed()
            .setColor(config.opts.color)
            .setAuthor(`Genepix | Liste des commandes`, client.user.displayAvatarURL())
            .addField("🙍️ **__Infos__**", `Bot de modération qui enregistre le nombre d'aides de chaque personnes du serveur`)
            .addField("❓ **__A quoi je sers ?__**", `Genepix sert à comptabiliser le nombre d'aides apportées par les utilisateurs du serveur`)
            .addField("❓ **__Pour quoi faire ?__**", `Ce système permet aux personnes sur le serveur de connaitre le \"référent\" pour chaque langage de programmation. Cela permet aux personnes qui ont besoin d'aide d'avoir une personne à qui se référer en cas de problèmes`)
            .addField("🤔 **__Comment ça marche ?__**", `Les personnes qui se sont faites aidées réagissent au message de la personne qui a aidé afin de lui faire augmenter son nombre d'aides dans le langage concerné`)
            .addField("<:github:819244316430041088> **__Github__**", `https://github.com/Semanteo/Genepix-bot`)
            .addFields(type.map(cmd => {
                        return {
                            name: `• ${cmd[0].toUpperCase()}${cmd.slice(1, 10)} (${client.commands.filter(command => command.category === cmd).size})`,
                            value: client.commands.filter(command => command.category === cmd).map(command => `\`${command.name}\``).join(", "),
                            inline: false
                        };
                    }))
            .setTimestamp(new Date())
            .setFooter(`© Genepix | Pour plus d'informations, faites ${config.bot.prefix}help <command>`, interaction.user.displayAvatarURL())

            return await interaction.reply({embeds: [embed]})
        } else {
            const data = client.commands.get(query.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query.toLowerCase()));
            if (!data) return await interaction.reply("❌ Commande non trouvée !");
    
            const aliases = ((data.aliases.length > 0) ? data.aliases.map((a) => `\`${a}\``).join(", ") : "`Aucun`");

           await interaction.reply({
                embeds: [{
                    author: {
                        name: `Commande : ${data.name} | Categorie : ${data.category[0].toUpperCase()}${data.category.slice(1, 10)}`,
                        icon_url: client.user.avatarURL()
                    },
                    description: `**${data.description}**`,
                    thumbnail: {
                        url: client.user.displayAvatarURL()
                    },
                    color: 0x2f6e93,
                    fields: [{
                        name: "\\⚙ Usage",
                        value: `\`${data.usage}\``.replace("{{prefix}}", config.bot.prefix)
                    }, {
                        name: "\\✨ Aliases",
                        value: aliases
                    }]
                }], ephemeral: true
            });
        }
    }
};