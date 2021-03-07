const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
require('./utils/handler')(client);
module.exports = {client: client}
client.login(auth.token);