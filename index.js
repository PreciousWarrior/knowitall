//libraries
const Discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');

//constants
const DANK_MEMER_ID = "270904126974590976";
const QUESTION_RESET_INTERVAL = 1; //time to reset the questions in hours
let questions;


function removeBoldText(question) {
    const array = question.split("")
    array.splice(0, 2);
    array.splice(array.length - 2, 2);
    return array.join("");
}

async function updateQuestions() {
    console.log("Updating questions...")
    questions = (await axios.get("https://raw.githubusercontent.com/PreciousWarrior/knowitall-scraper/main/results.json")).data;
}

async function sendMessage(channel, message) {
    //ignore if sending message causes error in channels where there is no write permission for the bot
    try {
        await channel.send(message);
    } catch (error) {

    }
}

//login
const client = new Discord.Client();
const token = fs.readFileSync("token.txt", "utf-8").replace("\n", "");


updateQuestions().then(() => {
    client.login(token);
})

client.once('ready', () => {
    console.log("Bot started successfully.");
    setInterval(updateQuestions, 1000 * 60 * 60 * QUESTION_RESET_INTERVAL);
})

client.on('message', message => {
    if (message.author.id != DANK_MEMER_ID) return;
    if (!message.embeds) return;
    if (message.embeds.length != 1) return;


    const embed = message.embeds[0]
    if (!embed.author || !embed.author.name) return;
    const embedContext = embed.author.name;
    if (!embedContext.endsWith("trivia question")) return;


    const description = embed.description;
    const question = removeBoldText(description.split("\n")[0]);
    const answers = description.split("\n").slice(3, 7).map(a => a.split(" ").slice(1, a.length).join(" ")).map(a => a.slice(0, a.length - 1).slice(1));
    const obj = questions.find(obj => obj.question === question);
    if (!obj) return;


    const letters = ["A", "B", "C", "D"];
    if (answers.indexOf(obj.answer) < 0) {
        return;
    }
    const letter = letters[answers.indexOf(obj.answer)];
    if (!letter) {
        return;
    }


    //sample iconURL-: https://cdn.discordapp.com/avatars/474898418138087428/a0f3f10b6e949b3110a1c888807f8a72.png?size=256
    const authorId = embed.author.iconURL.split("/")[4];
    if (!message.guild.member(authorId)) {
        //for people with default Avatars
        let authorName = embed.author.name.split(" ")[0];
        authorName = authorName.substring(0, authorName.length - 2)
        sendMessage(message.channel, `${authorName}, the correct answer is ${letter} (${obj.answer})!`);
    }
    else {
        sendMessage(message.channel, `<@${authorId}>, the correct answer is ${letter} (${obj.answer})!`);
    }

})