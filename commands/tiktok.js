const { getUserProfileInfo } = require("tiktok-scraper");
const { MessageEmbed } = require("discord.js");
const Command = require("../utils/commandHandler.js");

module.exports = class Tiktok extends Command {
    constructor() {
        super({
            name: "tiktok",
            category: "genepix",
            aliases: [],
            description: "Commande permettant de voir les infos concernant le tiktok de genepix",
            usage: (prefix) => `${prefix}tiktok`
        });
    }
    async run(message) {
        try {
            const user = await getUserProfileInfo("genepixontiktok");
            const embed = new MessageEmbed()
                .setAuthor("Infos sur la chaine tiktok de Genepix")
                .addField("Description", user.user.signature)
                .addField("Abonnés", user.stats.followerCount)
                .addField("Abonnements", user.stats.followingCount)
                .addField("Likes", user.stats.heart)
                .addField("Nombre de vidéos", user.stats.videoCount)
                .addField("Lien de la chaine", "https://www.tiktok.com/@genepixontiktok?lang=fr");
            await message.channel.send(embed);
        } catch (error) {
            console.log(error);
        }
    }
};