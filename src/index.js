require("dotenv").config();
const discord = require("discord.js");
const bot = new discord.Client();

bot.login(process.env.DISCORD_TOKEN.trim())
    //     .then(() => bot.guilds.cache.first().fetch())
    //     .then(guild => guild.channels.cache.find(channel => channel.id === process.env.DISCORD_CHANNEL.trim()).fetch())
    //     .then(channel => {
    //         channel.send("gathered ideas :\n").then((msg) => msg.pin());
    //     });

bot.on('message', msg => {
    if (msg.content.startsWith('!addIdea:')) {
        msg.reply('adding idea to sticky');
        console.log("searching channel");
        guild => guild.channels.cache.find(channel => channel.id === process.env.DISCORD_CHANNEL.trim()).fetch().fetchMessage(process.env.MESSAGE_ID).then(stickyMessage => {
            console.log("channel found : " + channel);
            console.log("stickyMessage found : " + stickyMessage);
            stickyMessage.edit(stickyMessage.content + "\n" + msg.content.substring(9, msg.content.length - 1));
        });
    }
});