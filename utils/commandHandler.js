module.exports = class Command {
    constructor(info) {
        this.name = info.name;
        this.aliases = info.aliases || [];
        this.description = info.description;
        this.usage = info.usage;
        this.category = info.category;
    }
};