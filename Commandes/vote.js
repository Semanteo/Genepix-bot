const Discord = require('discord.js');
const moment = require('moment');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = {
		name: "vote",
		category: "aides",
		aliases: [],
		description: "Commande permettant de rajouter des aides à un membre",
		usage: "{{prefix}}vote {membre} {java, python, rust, javascript, discordjs, discordpy, c, c++, c#, html, php, sys, bdd, arduino, lua, seo, asm}",
        data: new SlashCommandBuilder()
		.setName('vote')
		.setDescription('Commande permettant de rajouter des aides à un membre')
        .addUserOption(option => option.setName('target').setDescription('Mentionner un user').setRequired(true)),

        async execute(client, interaction) {

        const membre = interaction.options.getMember('target');

        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534')
        let score = client.getScore.get(membre.user.id, interaction.guild.id);
        if (interaction.user.id === membre.user.id) return
        if (!score) {
            score = {
                id: `${interaction.guild.id}-${interaction.user.id}`,
                user: interaction.user.id,
                guild: interaction.guild.id,
                java: 0,
                python: 0,
                rust: 0,
                discordjs: 0,
                discordpy: 0,
                c: 0,
                cplus: 0,
                csharp: 0,
                javascript: 0,
                html: 0,
                php: 0,
                sys: 0,
                bdd: 0,
                arduino: 0,
                lua: 0,
                seo: 0,
                asm: 0
            }
        }

        const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId('warn_reaso')
            .setPlaceholder('Rien de sélectionné')
            .addOptions([
                {
                    label: 'Java',
                    value: 'java',
                    emoji: '<:GOD_java:792105873915904030>'
                },
                {
                    label: 'Python',
                    value: 'python',
                    emoji: '<:GOD_python:791680344272666624>'
                },
                {
                    label: 'Rust',
                    value: 'rust',
                    emoji: '<:GOD_rust:807948690035441685>'
                },
                {
                    label: 'Discordjs',
                    value: 'discordjs',
                    emoji: '<:GOD_discordjs:807948702328160257>'
                },
                {
                    label: 'Discordpy',
                    value: 'discordpy',
                    emoji: '<:GOD_discordpy:807948674063400960>'
                },
                {
                    label: 'Javascript',
                    value: 'javascript',
                    emoji: '<:GOD_js:791680343698309121>'
                },
                {
                    label: 'C',
                    value: 'c',
                    emoji: '<:GOD_c:791659815906705438>'
                },
                {
                    label: 'C++',
                    value: 'c++',
                    emoji: '<:GOD_cpp:791659815990591538>'
                },
                {
                    label: 'C#',
                    value: 'c#',
                    emoji: '<:GOD_csharp:791680343886921728>'
                },
                {
                    label: 'HTML/CSS',
                    value: 'html',
                    emoji: '<:GOD_htmlcss:807948674184642590>'
                },
                {
                    label: 'Php',
                    value: 'php',
                    emoji: '<:GOD_php:792105887661555712>'
                },
                {
                    label: 'System-admin',
                    value: 'sys',
                    emoji: '<:GOD_sysadmin:807948673655898172>'
                },
                {
                    label: 'Database',
                    value: 'bdd',
                    emoji: '<:GOD_db:807948694430547998>'
                },
                {
                    label: 'Arduino/Raspberry',
                    value: 'arduino',
                    emoji: '<:GOD_arduino:807948681382199316>'
                },
                {
                    label: 'Lua',
                    value: 'lua',
                    emoji: '<:GOD_lua:808287061631041566>'
                },
                {
                    label: 'Seo',
                    value: 'seo',
                    emoji: '<:GOD_seo:807948680879407106>'
                },
                {
                    label: 'Asm',
                    value: 'asm',
                    emoji: '<:GOD_asm:807948700777054218>'
                },
            ]),
    );
        await interaction.reply({content: "Veuillez choisir le langage pour le vote", components: [row]});

        const filter = i => {
            return i.user.id === interaction.user.id;
        };
        
        interaction.channel.awaitMessageComponent({ filter, componentType: 'SELECT_MENU', time: 60000 })
            .then(async interaction => {
                var lang;

            if(interaction.values) {
                lang = interaction.values[0];
            }
            



            if (lang === 'java') {
                score.java++;
                client.setScore.run(score);

                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'python') {
                score.python++;
                client.setScore.run(score);

                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'rust') {
                score.rust++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'discordjs') {
                score.discordjs++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'discordpy') {
                score.discordpy++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'c') {
                score.c++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'c++') {
                score.cplus++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'javascript') {
                score.javascript++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'c#') {
                score.csharp++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'html') {
                score.html++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'php') {
                score.php++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'sys') {
                score.sys++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'bdd') {
                score.bdd++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'arduino') {
                score.arduino++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'lua') {
                score.lua++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'seo') {
                score.seo++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }
            if (lang === 'asm') {
                score.asm++;
                client.setScore.run(score);
                await interaction.reply(`Aide pour <@${membre.user.id}> enregistrée pour le langage ${lang}`)
                channel.send(`[LOG] : <@${interaction.user.id}> a ajouté une aide à <@${membre.user.id}> dans le salon <#${interaction.channel.id}>\nLien : https://discord.com/channels/789670704911613992/${interaction.channel.id}/${interaction.id}`)
            }   
        }).catch(err => console.log(`No interactions were collected.`, err));
}
}
