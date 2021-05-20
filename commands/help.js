const Discord = require('discord.js');
const {convertTime} = require("../utils/function.js");
const Command = require("../utils/commandHandler.js");

module.exports = class Help extends Command {
    constructor() {
        super({
            name: "help",
            category: "bot",
            aliases: ["h"],
            description: "Aide sur les commandes",
            usage: "{{prefix}}help <commandName>"
        });
    }    
        run(message, client, args) {
            const query = args.slice(1).join(" ");
    
            if (!query) {
                let type = [];
                client.commands.forEach(cmd => {
                    if (!type.includes(cmd.category) && (client.config.root.includes(message.author.id) || cmd.category !== "admin")) {
                        type.push(cmd.category);
                    }
                });
                let embed = new Discord.MessageEmbed()
                .setColor(client.config.opts.color)
                .setAuthor(`Genepix | Liste des commandes`, client.user.displayAvatarURL())
                .addField("🙍️ **__Infos__**", `Bot de modération qui enregistre le nombre d'aides de chaque personnes du serveur`)
                .addField("✏️ **__Commandes disponibles__**", `**- g!lb**\n**- g!rank/g!level/g!lvl**\n**- g!tiktok**\n**- g!vote**\n**- g!help/g!infos**\n**- g!links**\n**- g!ping**\n**- g!botinfo**\n**- g!stats**\n**- g!serverinfo**\n**- g!voc**\n**g!report**\nPour les informations sur la commande : g! + help/infos + nom de la commande`)
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
                .setFooter(`© Genepix | Pour plus d'informations, faites ${client.config.bot.prefix}help <command>`, message.author.displayAvatarURL())

                return message.channel.send({embed})
            } else {
                const data = client.commands.get(query.toLowerCase()) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(query.toLowerCase()));
                if (!data) return message.channel.send("❌ Commande non trouvée !");
        
                const aliases = ((data.aliases.length > 0) ? data.aliases.map((a) => `\`${a}\``).join(", ") : "`Aucun`");
    
                message.channel.send({
                    embed: {
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
                            value: `\`${data.usage}\``.replace("{{prefix}}", client.config.bot.prefix)
                        }, {
                            name: "\\✨ Aliases",
                            value: aliases
                        }]
                    }
                });
            }
        }
    };