const { Client, Collection } = require("discord.js");
const { readdir } = require("fs/promises");
const { join } = require("path");

class Genepix extends Client {
    constructor() {
        super({});
        this.config = require("./config.js");
        this.commands = new Collection();
        this.launch().catch();
    }

    async launch() {
        await this.eventsLoad();
        await this.commandsLoad();
        this.login(this.config.bot.token).then(() => console.log(["Genepix"], "Connecté à discord")).catch((e) => {
            console.error(["Base-WS"], `Connection error: ${e}`);
            return process.exit(1);
        });
    }

    async eventsLoad() {
        const events = (await readdir(join(__dirname, "./events"))).filter(f => f.endsWith(".js"));
        if (events.length === 0) {
            console.log(["Problem"], "No event found !");
            return;
        }
        let count = 0;

        for (const element of events) {
            try {
                const eventName = element.split(".")[0];
                const filter = require(join(__dirname, "./events", element));
                this.on(eventName, filter.bind(null, this));
                delete require.cache[require.resolve(join(__dirname, "./events", element))];
                count++;
            } catch (err) {
                console.log(["Error"], `An error has occurred:\n\n${err.message}`);
            }
        }
        console.log(["Events"], `${count}/${events.length} events chargés`);
    }

    async commandsLoad() {
        let count = 0;
        const commands = (await (join(__dirname, "./commands"))).filter(f => f.endsWith(".js"));
        if (commands.length === 0) {
            console.log(["Problem"], "No command found !");
            return;
        }

        for (const element of commands) {
            try {
                const filter = new (require(join(__dirname, "./commands", element)))();
                this.commands.set(filter.name, filter);
                count++;
            } catch (err) {
                console.log(["Error"], `An error has occurred with:\n\n${element}: ${err.message}`);
            }
        }
        console.log(["Commands"], `${this.commands.size}/${count} commandes chargées`);
    }
}

module.exports.client = new Genepix();