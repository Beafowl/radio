const Discord = require('discord.js');
const { token } = require('./config/config');

const client = new Discord.Client();

// outputs audio to bot
let audioChannel;

// plays audio to audiochannel
let dispatcher;

const printMessage = (msg) => {

    const currentDate = new Date();

    console.log(`[${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}] ${msg}`);

}

// function executed when online

client.on('ready', () => {
    printMessage('Discord bot online');
    client.user.setActivity('Bot für 89.0 RTL');
});


client.on('message', async (msg) => {

    if (msg.author.bot) return;
    
    if (msg.content == '!rtl') { // bot joins channel and plays radio

		if (msg.member.voice.channel) {

            try {

                audioChannel = await msg.member.voice.channel.join();
                printMessage(`Channel ${msg.channel.name} at server ${msg.guild.name}: Bot joined voice channel ${msg.member.voice.channel}`);

            } catch(err) {

                console.log(err);
            }
            dispatcher = audioChannel.play('https://stream.89.0rtl.de/live/mp3-128/direktlinkHP/');
        }

    } else if (msg.content == '!stop') { // stops music 

        printMessage(`Channel ${msg.channel.name} at server ${msg.guild.name}: Bot has been stopped`);
        dispatcher.end();

    } else if (msg.content == '!quit') { // logout

        printMessage('Bot logged out');
        client.destroy();
    }
});

client.login(token);

// link: https://discord.com/api/oauth2/authorize?client_id=788485025829486633&scope=bot&permissions=3145728