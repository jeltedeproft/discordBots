import * as dotenv from 'dotenv';
import Discord from 'discord.js';
import fs from 'fs';

dotenv.config();

const bot = new Discord.Client();

fs.readFile("./ideas.json", "utf8", (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        console.log("jsonstring is:", jsonString);
        const ideas = JSON.parse(jsonString);
        console.log("ideas are:", ideas);
    } catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});

await bot.login(process.env.DISCORD_TOKEN.trim());
const intix = await bot.guilds.cache.first().fetch();
console.log(intix.name);
const channel = await (intix.channels.cache.find(channel => channel.id === process.env.DISCORD_CHANNEL.trim())).fetch();
console.log(channel.name);
const message = await channel.messages.fetch(process.env.MESSAGE_ID);

//array bijhouden en array omzetten naar string met stringify



bot.on('message', msg => {
    if (msg.content.startsWith('!addIdea:')) {
        msg.reply('adding idea to sticky');
        fs.writeFileSync('ideas.json', msg.content);
        message.edit(message.content + "\n 1." + msg.content.substring(9, msg.content.length));
    }

    if (msg.content.startsWith('!showIdeas:')) {
        msg.reply(ideas);
    }

    if (msg.content.startsWith('!createList')) {
        channel.send("ideas :\n").then((msg) => msg.pin());
    }
});