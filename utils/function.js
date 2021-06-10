module.exports.convertTime = (timeInSeconds) => {
    let time = "";
	
    const days = Math.floor(timeInSeconds / 86400);
    const hours = Math.floor((timeInSeconds - (Math.floor(timeInSeconds / 86400) * 86400)) / 3600);
    const min = Math.floor((timeInSeconds - (Math.floor(timeInSeconds / 3600) * 3600)) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
	
    if (days > 0){
        time += days > 1 ? `${days} jours` : `${days} jour`;
    }

    if (hours > 0) {
        if(days > 0) {
            time += ", ";
        }
        time += hours > 1 ? `${hours} heures` : `${hours} heure`;
    }

    if (min > 0){
        if(hours > 0 || days > 0){
            time += ", ";
        }
        time += min > 1 ? `${min} minutess` : `${min} minutes`;
    }

    if (seconds > 0){
        if(hours > 0 || days > 0 || min > 0) {
            time += ", ";
        }
        time += seconds > 1 ? `${seconds} secondes` : `${seconds} seconde`;
    }
	
    return time;
};

module.exports.getScore = (client, userId, guildId) => {
    let score = client.getScore.get(userId, guildId);

    if (!score) {
        score = {
            id: `${guildId}-${userId}`,
            user: userId,
            guild: guildId,
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
            asm: 0,
            voc: 0
        };
    }
    return score;
};