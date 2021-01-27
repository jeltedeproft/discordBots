require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client();

bot.login(process.env.DISCORD_TOKEN.trim());

console.log("bot.guilds = " + bot.guilds.fetch.cache);
const guild = bot.guilds.fetch.cache.first().fetch();
const channel = ideasGuild.channels.cache.find(channel => channel.id === process.env.DISCORD_CHANNEL.trim()).fetch();
const message = channel.fetchMessage(process.env.MESSAGE_ID);


bot.on('message', msg => {
    if (msg.content.startsWith('!addIdea:')) {
        msg.reply('adding idea to sticky');
        console.log("searching channel");
        console.log("guild = " + guild);
        console.log("channel = " + channel);
        console.log("message = " + message);
        message.edit(message.content + "\n" + msg.content.substring(9, msg.content.length - 1));
    }
});