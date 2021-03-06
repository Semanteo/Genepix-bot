const TikTokScraper = require('tiktok-scraper');
const Discord = require('discord.js');
const Command = require("../utils/commandHandler.js");
module.exports = class Botinfo extends Command {
	constructor() {
		super({
			name: "tiktok",
			category: "genepix",
			aliases: [],
			description: "Commande permettant de voir les infos concernant le tiktok de genepix",
			usage: "{{prefix}}tiktok"
		});
	}
async run(message) {
        try {
            const user = await TikTokScraper.getUserProfileInfo('genepixontiktok');
            let em = new Discord.MessageEmbed()
                .setAuthor("Infos sur la chaine tiktok de Genepix")
                .addField("Description", user.user.signature)
                .addField("Abonnés", user.stats.followerCount)
                .addField("Abonnements", user.stats.followingCount)
                .addField("Likes", user.stats.heart)
                .addField("Nombre de vidéos", user.stats.videoCount)
                .addField("Lien de la description", user.user.bioLink.link)
                .addField("Lien de la chaine", 'https://www.tiktok.com/@genepixontiktok?lang=fr')
            message.channel.send(em)
        } catch (error) {
            console.log(error);
        }
}
};