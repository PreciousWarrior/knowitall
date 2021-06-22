//libraries
const Discord = require('discord.js');
const fs = require('fs');

//login
const client = new Discord.Client();
const token = fs.readFileSync("token.txt", "utf-8");
const questions = JSON.parse(fs.readFileSync("results.json"))
client.login(token);
client.once('ready', () => {
    console.log("Bot started successfully.")
})

//constants
const DANK_MEMER_ID = "270904126974590976"


function removeBoldText(question) {
    const array = question.split("")
    array.splice(0, 2);
    array.splice(array.length - 2, 2);
    return array.join("");
}


client.on('message', message => {
    if (message.author.id != DANK_MEMER_ID) return;
    if (!message.embeds) return;
    if (message.embeds.length != 1) return;

    const embed = message.embeds[0]
    if (!embed.author || !embed.author.name) return;
    const embedContext = embed.author.name;

    if (!embedContext.endsWith("trivia question")) return;

    //sample iconURL-: https://cdn.discordapp.com/avatars/474898418138087428/a0f3f10b6e949b3110a1c888807f8a72.png?size=256
    const authorId = embed.author.iconURL.split("/")[4];
    const description = embed.description;

    const question = removeBoldText(description.split("\n")[0]);
    const answers = description.split("\n").slice(3, 7).map(a => a.split(" ").slice(1, a.length).join(" ")).map(a => a.slice(0, a.length - 1).slice(1));
    const obj = questions.find(obj => obj.question === question);
    if (!obj) return;

    const letters = ["A", "B", "C", "D"];
    if (answers.indexOf(obj.answer) < 0) {
        return message.channel.send(`<@${authorId}>, the correct answer is ${obj.answer}!`);
    }
    const letter = letters[answers.indexOf(obj.answer)];
    const reply = `<@${authorId}>, the correct answer is ${letter} (${obj.answer})!`;
    message.channel.send(reply);
})