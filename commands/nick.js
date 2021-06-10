const { readFile } = require("fs/promises");
const Command = require("../utils/commandHandler.js");

module.exports = class Nick extends Command {
    constructor() {
        super({
            name: "nick",
            category: "admin",
            aliases: [],
            description: "Commande permettant d'enlever les carachtères spéciaux d'un pseudo",
            usage: (prefix) => `${prefix}nick <membre>`
        });
    }

    async run(message) {
        const member = message.mentions.members.first();
        const role = message.guild.roles.cache.get("791681762124103721");
        if (!(message.member.roles.cache.has(role.id) || message.author.id === "398126558432329728")) {
            await message.channel.send("Vous n'avez pas la permission");
            return;
        }

        if(!member) {
            const msg = await message.channel.send("Veuillez mentionner la personne à qui enlevé les charactères spéciaux.");
            msg.delete({timeout: 4000});
            return;
        }
        const li = [];
        let m = member.nickname;

        const file = await readFile("./decancer.txt", {encoding: "utf-8"});
        file.split("\n")
            .forEach((line) => li.push(line.replace("\r", "")));

        for(let i = 0; i < li.length; i++){
            const characters = li[i].split(",");    
            m = m.replace(characters[0], characters[1]);       
        }
        member.setNickname(m).catch(console.error);
        message.channel.send(`Les caractères spéciaux on bien été enlevé du pseudo de ${member.user.tag}`);
    }
};