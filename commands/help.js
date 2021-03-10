const Discord = require('discord.js');
const {convertTime} = require("../utils/function.js");
function infos(message, client, args) {
        if (!args[1]) {

            let info = new Discord.MessageEmbed()
                .setAuthor("Informations sur moi", client.user.displayAvatarURL())
                .addField("🙍️ **__Infos__**", `Bot de modération qui enregistre le nombre d'aides de chaque personnes du serveur`)
                .addField("⏲️ **__Uptime__**", `${convertTime(process.uptime())}`)
                .addField("✏️ **__Commandes disponibles__**", `**- g!lb**\n**- g!rank/g!level/g!lvl**\n**- g!tiktok**\n**- g!vote**\n**- g!help/g!infos**\nPour les informations sur la commande : g! + help/infos + nom de la commande`)
                .addField("❓ **__A quoi je sers ?__**", `Genepix sert à comptabiliser le nombre d'aides apportées par les utilisateurs du serveur`)
                .addField("❓ **__Pour quoi faire ?__**", `Ce système permet aux personnes sur le serveur de connaitre le \"référent\" pour chaque langage de programmation. Cela permet aux personnes qui ont besoin d'aide d'avoir une personne à qui se référer en cas de problèmes`)
                .addField("🤔 **__Comment ça marche ?__**", `Les personnes qui se sont faites aidées réagissent au message de la personne qui a aidé afin de lui faire augmenter son nombre d'aides dans le langage concerné`)
                .addField("<:github:819244316430041088> **__Github__**", `https://github.com/Semanteo/Genepix-bot`)
                .setThumbnail(client.user.displayAvatarURL())
                .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                .setColor(0x8186dc);
            message.channel.send(info);
        } else {
            if (args[1] === "rank" || args[1] === "level" || args[1] === "lvl") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande rank/level/lvl", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant de voir votre nombre d'aides dans chaque langage ou celui d'une autre personne`)
                    .addField("⚙️ **__Utilisation__**", `g! + rank/level/lvl + [mention de l'utilisateur]\nCe qui est entre crochets et optionnel`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "lb") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande lb", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant de voir les infos concernant le tiktok de Genepix`)
                    .addField("⚙️ **__Utilisation__**", `g! + lb`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "tiktok") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande tiktok", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant d'afficher les référents de chaque langage`)
                    .addField("⚙️ **__Utilisation__**", `g! + tiktok`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
            if (args[1] === "vote") {
                let inf = new Discord.MessageEmbed()
                    .setAuthor("Informations sur la commande vote", client.user.displayAvatarURL())
                    .addField("🙍️ **__Infos__**", `Commande permettant d'augmenter le nombre d'aides d'une personne dans le langage concerné`)
                    .addField("⚙️ **__Utilisation__**", `g! + vote + {@mention} + {langage}\nCe qui est entre accolades est optionnel`)
                    .addField("✏️ **__Langages disponibles__**", `java, python, rust, javascript, discordjs, discordpy, c, c++, c#, html, php, sys, bdd, arduino, lua, seo, asm`)
                    .setThumbnail(client.user.displayAvatarURL())
                    .setFooter(`Réalisé par Semanteo#0001 pour Genepix | Version 1.0.0`, client.user.displayAvatarURL())
                    .setColor(0x8186dc);
                message.channel.send(inf);
            }
        }
}
module.exports.infos = infos;