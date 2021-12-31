const Discord = require('discord.js')
const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');
const g = "791642103393812490";
const chat = "845315288240488458";
const weather = require('weather-js');


module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
    if (message.channel.id === chat) {
        if (message.author.bot) return;
        if(message.content.startsWith('?')) return 
        console.log(message.content)
        const data = [
            {
                name: 'temps',
                answertype: 'normal',
                words: ['quelle', 'quel', 'temps', 'fait-il', 'fait', 'il'],
                important: ['temps', 'fait-il', 'fait', 'il'],
                answers: ['il fait {0}°C à {1} aujourd\'hui à {2}'],
                after: [],
                getinfoafter: [' à ', ' a ', ' de ', ' dans '],
                function: getWeather,
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: "bonjour",
                answertype: 'normal',
                words: ['salut', 'wsh', 'yo', 'bonjour', 'wesh', 'cc', 'coucou', 'slt'],
                important: [],
                answers: ['bonjour', 'salut', 'yo'],
                after: [','],
                getinfoafter: [],
                minimalmatch: 1,
                minimalpercent: 0
            },
            {
                name: 'balek',
                answertype: 'normal',
                words: ['je', 'en', 'bat', 'couille', 'couilles', 'fou', 'fous', 'blc', 'osef'],
                important: [],
                answers: ['ah', 'pas cool ça', 'mais pourquoi :c', ':('],
                after: [],
                getinfoafter: [],
                minimalmatch: 2,
                minimalpercent: 0
            },
            {
                name: 'couleur',
                answertype: 'normal',
                words: ['quel', 'quelle', 'couleur', 'pref', 'préférée', 'est', 'ta', 'quoi'],
                important: ['couleur'],
                answers: ["ma couleur préférée est le rouge", "j'aime bien le rouge", "le rouge c'est cool"],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: 'drake',
                answertype: 'normal',
                words: ['<:GOD_drakeyes:833264369873584159>'],
                important: ['<:GOD_drakeyes:833264369873584159>'],
                answers: ["<:GOD_drakeyes:833264369873584159>"],
                after: [],
                getinfoafter: [],
                minimalmatch: 1,
                minimalpercent: 0
            },
            {
                name: "blague",
                answertype: 'normal',
                words: ['raconte', 'dit', 'nous', 'moi', 'une', 'blague'],
                important: ['blague'],
                answers: ["C'est l'histoire d'un pingouin qui respire par les fesses\nUn jour il s’assoit et il meurt"
                , "C'est l'histoire d'un zoophile qui rentre dans un bar"
                , "Comment s'appelle le cul de la Schtroumpfette ?\nLe blu-ray"
                , "Qu'est-ce qui est dur, blanc, avec le bout rouge, et qui sent la pisse ?\nUne borne kilométrique"
                ,"C'est l'histoire de 2 patates qui traversent la route.\nL’une d’elle se fait écraser.\nL’autre dit : « Oh purée ! »"
                ,"Une fesse gauche rencontre une fesse droite :\n« Tu ne trouves pas que ça pue dans le couloir ? »"
                ,"C'est l'histoire d'un zoophile qui prend son élan"],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: 'humeur',
                answertype: 'normal',
                words: ['est', 'quelle', 'comment', 'ça', 'ca', 'va', 'tu', 'vas', 'humeur', 'ton', 'vas-tu'],
                important: ['ça', 'va', 'vas-tu', 'humeur'],
                answers: ['je vais bien', 'ca va bien'],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: 'insultes',
                answertype: 'normal',
                words: ['connard', 'enculé', 'fdp', 'ntm', 'pute', 'con', 'tg', "tais", "tais-toi"],
                important: [],
                answers: ['ne m\'insute pas'],
                after: [],
                getinfoafter: [],
                minimalmatch: 1,
                minimalpercent: 0
            },
            {
                name: 'help',
                answertype: 'question',
                words: ['ai', 'aide', 'besoin', 'veux', 'je', 'aide', 'peux', 'aide', 'cherche', "j'ai", "l'aide", "d'aide"],
                important: [],
                answers: ['en quoi puis-je vous aider'],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: 'whatismyname',
                answertype: 'normal',
                words: ['quoi', 'quel', 'est', 'ton', 'comment', 'tu', 'nom', 'prenom', 'appelles', "t'appelles"],
                important: ['nom', 'prenom', 'appelles', "t'appelles"],
                answers: ["yo je suis Genepix IA"],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 0
            },
            {
                name: 'whatisthetimelocal',
                answertype: 'normal',
                words: ['est', 'quelle', 'heure', 'est-il', 'il'],
                important: ['heure', 'est-il', 'il'],
                answers: [`il est ${getHour()} chez moi`, "Actuellement il est " + getHour() +" chez moi"],
                after: [],
                getinfoafter: [],
                minimalmatch: 3,
                minimalpercent: 80
            },
            {
                name: 'dev',
                answertype: 'normal',
                words: ['en','qui', 'quel', 'comment', "est", "tu", 'langage', 'language', 'code', 'programmation', 'fait', 'été', 'codé', 'dev'],
                important: ['langage', 'language', 'code', 'programmation', 'fait', 'été', 'codé', 'dev'],
                answers: ["j'ai été développé en javscript par <@398126558432329728>"],
                after: [],
                getinfoafter: [],
                minimalmatch: 4,
                minimalpercent: 0
            },
            {
                name: 'ok',
                answertype: 'normal',
                words: ['ok', 'okay', 'dac', 'dacc', "d'accord"],
                important: [],
                answers: ['cool', "d'accord", 'ça marche'],
                after: [],
                getinfoafter: [],
                minimalmatch: 1,
                minimalpercent: 80
            }
        ]
        
          function getWeather(ville) {
            if (ville === null) {
                message.channel.send('Indiquez une ville !').catch()
            } else
            {
                return new Promise(async (resolve) => {
                    weather.find({ search: ville, degreeType: 'C' }, (err, res) => {
                        if (err) resolve(['inconnu', 'inconnu', 'inconnu'])
                        try {
                            resolve([res[0].current.temperature, res[0].location.name, res[0].current.observationtime])
                        } catch (e) {
                            resolve(['inconnu', 'inconnu', 'inconnu'])
                        }
                    })
                });
            }
        }
        
        function getHour() {
            return new Date().getHours() + "h" + new Date().getMinutes()
        }
        
        async function processString(message) {
            let builtSentence = []
            let outSentence = ''
        
            for (const phrase of message.split(/[.?!]/)) {
                const words = removeShit(phrase.toLowerCase().replace(/,/g, '').replace(/é/g, 'e')).split(' ')
        
                for (const req of data) {
                    const match = numberOfWordMatch(words, req.words)
                    if (message.length <= 3 && req.minimalmatch >= 3) req.minimalmatch--
                    if (match < req.minimalmatch || (match < req.minimalmatch && req.minimalpercent > 0 && (message.split(' ').length / 100 * match) < req.minimalpercent) || (req.important.length > 0 && numberOfWordMatch(words, req.important) < 1)) continue
        
                    builtSentence.push(req)
                }
            }
        
            if (builtSentence.length > 0) {
                let i = 0
                let add = ''
                for (const data of builtSentence) {
                    i++
        
                    const up = ['?', '.', '!'].includes(outSentence.slice(-2).replace(/ /g, '')) || (outSentence.length < 2)
        
                    if (builtSentence.length === i)
                        add = data.answertype === 'normal' ? ran(['.', ' !']) : ' ?'
                    else
                        if ([3, 6, 9, 12, 15, 18].includes(i))
                            add = data.answertype === 'normal' ? '. ' : ' ? '
                        else
                            add = data.after.length > 0 ? ran(data.after) + ' ' : (up && ((builtSentence.length - i + 1) >= 3)) || add.includes('et') ? ', ' : ' et '
        
                    let rndm = ran(data.answers)
        
                    const resultsData = stringContainsList(message, data.getinfoafter)
        
                    if (data.getinfoafter.length > 0) {
                        let parsedData = null
                        if (resultsData.length > 0)
                            for (const result of resultsData)
                                parsedData = message.split(result)[1].split(" ")[0]
                        const answer = await data.function(parsedData)
                        rndm = ran(data.answers).format(...answer)
                    }
        
                    outSentence += (up ? rndm.charAt(0).toUpperCase() + rndm.slice(1) : rndm) + add
                }
        
            } else outSentence = "Je n'ai pas compris"
        
            return outSentence
        }
        
        String.prototype.format = function () {
            let args = arguments;
            return this.replace(/{(\d+)}/g, function (match, number) {
                return typeof args[number] != 'undefined'
                    ? args[number]
                    : match
                    ;
            });
        };
        
        function stringContainsList(s, l) {
            let results = []
            for (const a of l)
                if (s.includes(a))
                    results.push(a)
            return results
        }
        
        function ran(list) {
            return list[Math.floor(Math.random() * list.length)];
        }
        
        function numberOfWordMatch(words, dataword) {
            let numberMatch = 0
            words = words.filter(function (item, pos) {
                return words.indexOf(item) == pos;
            })
            for (const word of words)
                if (dataword.includes(word))
                    numberMatch++
            return numberMatch
        }
        
        function removeShit(s) {
            let b = ''
            s.split('\'').forEach(e => b += e.slice(0, -1))
            b += s.slice(-1)
            return b
        }      
        console.log(processString(message.content))
      message.channel.send((await processString(message.content)));
}

    if (message.content.includes('discord.gg/'||'discordapp.com/invite/')) { 
        message.delete().then(message.channel.send('Les liens ne sont pas autorisés'))
    }
    if (message.channel.id === g) {
        if (message.author.bot) return
        if(message.content.startsWith('#') && message.member.roles.cache.find(x => x.id === "791681762124103721")) return 
      if(message.author.id !== '799936922939162635'){
        let embed = new Discord.MessageEmbed()
        .setTitle(`Nouvelle idée de ${message.member.user.tag}`)
        .setThumbnail(message.member.user.displayAvatarURL({dynamic: true}))
        .setDescription(`**Idée :** ${message.content}`)
        .addField("\u200b", "Réagissez dans <#797472517647630377>")
        .setTimestamp(new Date)
        const c = await message.channel.send({embeds: [embed]}).then(message.delete())
        await c.react('<:GOD_yes:812255443036274720>');
        await c.react('🤔');
        await c.react('<:GOD_no:911550596190990346>');
        }}
    if (message.author.id === client.user.id) return
    let score;

    if (message.guild) {
        score = client.getScore.get(message.author.id, message.guild.id);
        if (!score) {
            score = {
                id: `${message.guild.id}-${message.author.id}`,
                user: message.author.id,
                guild: message.guild.id,
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
        client.setScore.run(score);
    }
}
}