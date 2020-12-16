const Discord = require('discord.js');
const { token } = require('./config/config');

const client = new Discord.Client();

let audio;
let dispatcher;

// function executed when online

client.on("ready", () => {

    console.log("Discord bot online");
    client.user.setActivity('Bot für 89.0 RTL');
});

client.on("message", async (msg) => {

    if (msg.author.bot) return;
    
    if (msg.content == "!rtl") {

		if (msg.member.voice.channel) {
            audio = await msg.member.voice.channel.join();
            dispatcher = audio.play('https://stream.89.0rtl.de/live/mp3-128/direktlinkHP/');

            dispatcher.on('start', () => {
                console.log('audio.mp3 is now playing!');
            });
            
            dispatcher.on('finish', () => {
                console.log('audio.mp3 has finished playing!');
            });
            
            dispatcher.on('error', console.error);
        }

    }
});

client.login(token);