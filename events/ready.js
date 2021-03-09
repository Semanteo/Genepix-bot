const {client} = require('../app');
const SQLite = require('better-sqlite3');
const sql = new SQLite('../scores.sqlite');

client.on("ready", () => {

    const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
    if (!table['count(*)']) {

        sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, java INTEGER, python INTEGER, rust INTEGER, discordjs INTEGER, discordpy INTEGER, c INTEGER, cplus INTEGER, csharp INTEGER, javascript INTEGER, html INTEGER, php INTEGER, sys INTEGER, bdd INTEGER, arduino INTEGER, lua INTEGER, seo INTEGER, asm INTEGER, warns INTEGER);").run();

        sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
        sql.pragma("synchronous = 1");
        sql.pragma("journal_mode = wal");
    }

    client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");

    client.setScore = sql.prepare("REPLACE INTO scores (id, user, guild, java, python, rust, discordjs, discordpy, c, cplus, csharp, javascript, html, php, sys, bdd, arduino, lua, seo, asm, warns) VALUES (@id, @user, @guild, @java, @python, @rust, @discordjs, @discordpy, @c, @cplus, @csharp, @javascript, @html, @php, @sys, @bdd, @arduino, @lua, @seo, @asm, @warns);");
    setInterval(function () {
        client.user.setPresence({
            activity: {
                name: `les aides de ${client.users.cache.size} users, dans les ${client.channels.cache.size} channels de Genepix • g!help`,
                type: "WATCHING",
            }
        })
    }, 15000);
    {
        console.log("Je suis connecté !")
    }
});