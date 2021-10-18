const SQLite = require('better-sqlite3');
const sql = new SQLite('./scores.sqlite');

module.exports = {
	name: 'ready',
	once: true,
	execute(client, tablee, tabl) {
        const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
        if (!table['count(*)']) {
    
            sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, java INTEGER, python INTEGER, rust INTEGER, discordjs INTEGER, discordpy INTEGER, c INTEGER, cplus INTEGER, csharp INTEGER, javascript INTEGER, html INTEGER, php INTEGER, sys INTEGER, bdd INTEGER, arduino INTEGER, lua INTEGER, seo INTEGER, asm INTEGER);").run();
            sql.prepare("CREATE TABLE warns (id TEXT PRIMARY KEY, user TEXT, guild TEXT, warner TEXT, reason TEXT);").run();
    
            sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
            sql.pragma("synchronous = 1");
            sql.pragma("journal_mode = wal");
        }
    
        client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
    
        client.getWarns = sql.prepare("SELECT * FROM warns WHERE user = ? AND guild = ?");
        client.setWarns = sql.prepare("INSERT INTO warns (id, user, guild, warner, reason) VALUES (@id, @user, @guild, @warner, @reason)");
        client.clearWarns = sql.prepare("DELETE FROM warns WHERE user = ?");
    
        client.setScore = sql.prepare("REPLACE INTO scores (id, user, guild, java, python, rust, discordjs, discordpy, c, cplus, csharp, javascript, html, php, sys, bdd, arduino, lua, seo, asm) VALUES (@id, @user, @guild, @java, @python, @rust, @discordjs, @discordpy, @c, @cplus, @csharp, @javascript, @html, @php, @sys, @bdd, @arduino, @lua, @seo, @asm);");
        setInterval(function () {
            const guild = client.guilds.cache.find(g => g.id === '789670704911613992')
            client.user.setActivity(
                    `les aides de ${guild.memberCount} users, dans les ${guild.channels.cache.size} channels de Genepix • g!help`,
                    {type: "WATCHING"}
            )
        }, 15000);
  
        const channel = client.channels.cache.find(channel => channel.id === '812304842647273534');
        channel.send(`**__Bot start information__**
        \`\`\`md
        ${tablee.toString()}\`\`\`
        \`\`\`md
        ${tabl.toString()}\`\`\`
        `)
	},
};