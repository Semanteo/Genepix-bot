const SQLite = require("better-sqlite3");
const sql = new SQLite("./scores.sqlite");

module.exports = function (client) {

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table["count(*)"]) {
        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, java INTEGER, python INTEGER, rust INTEGER, discordjs INTEGER, discordpy INTEGER, c INTEGER, cplus INTEGER, csharp INTEGER, javascript INTEGER, html INTEGER, php INTEGER, sys INTEGER, bdd INTEGER, arduino INTEGER, lua INTEGER, seo INTEGER, asm INTEGER, voc INTEGER);").run();
        sql.prepare("CREATE TABLE warns (id TEXT PRIMARY KEY, user TEXT, guild TEXT, warner TEXT, reason TEXT);").run();

        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");

    client.getWarns = sql.prepare("SELECT * FROM warns WHERE user = ? AND guild = ?");
    client.setWarns = sql.prepare("INSERT INTO warns (id, user, guild, warner, reason) VALUES (@id, @user, @guild, @warner, @reason)");
    client.clearWarns = sql.prepare("DELETE FROM warns WHERE user = ?");

    client.setScore = sql.prepare("REPLACE INTO scores (id, user, guild, java, python, rust, discordjs, discordpy, c, cplus, csharp, javascript, html, php, sys, bdd, arduino, lua, seo, asm, voc) VALUES (@id, @user, @guild, @java, @python, @rust, @discordjs, @discordpy, @c, @cplus, @csharp, @javascript, @html, @php, @sys, @bdd, @arduino, @lua, @seo, @asm, @voc);");
    setInterval(function () {
        const guild = client.guilds.cache.get("789670704911613992");
        client.user.setPresence({
            activity: {
                name: `les aides de ${guild.memberCount} users, dans les ${guild.channels.cache.size} channels de Genepix • g!help`,
                type: "WATCHING",
            }
        });
    }, 15000);

    setInterval(function () {
        const guild = client.guilds.cache.get("789670704911613992");


        guild.members.cache.forEach(member => {
            if(member.user.bot) {
                return;
            }
            if(member.voice.channel){
                if(member.voice.channel.members.size === 1) {
                    return;
                }
                const bots = member.voice.channel.members.filter(m => m.user.bot === true);
                if(bots.size !== 0) {
                    return;
                }
                let score = client.getScore.get(member.id, guild.id);
                if(!score) {
                    score = {
                        id: `${guild.id}-${member.id}`,
                        user: member.id,
                        guild: guild.id,
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
                score.voc += 15;
                client.setScore.run(score);
            }
            
        });
    }, 15000);
};