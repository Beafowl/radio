const Discord = require('discord.js');
const { token } = require('./config/config');

const client = new Discord.Client();

// outputs audio to bot
let audioChannel;

// plays audio to audiochannel
let dispatcher;

// voice channel where the bot is located
let voicechannel;
let voicechannelId;

// format number as two digits

const formatNumber = (num) => {

    return('0' + num).slice(-2);
}

// print message with timestamp

const printMessage = (msg) => {

    const currentDate = new Date();

    console.log(`[${formatNumber(currentDate.getHours())}:${formatNumber(currentDate.getMinutes())}:${formatNumber(currentDate.getSeconds())}] ${msg}`); // ("0" + myNumber).slice(-2);

}

// function executed when online

client.on('ready', () => {
    printMessage('Discord bot online');
    client.user.setActivity('Bot für 89.0 RTL');
});

// command received

client.on('message', async (msg) => {

    if (msg.author.bot) return;
    
    if (msg.content == 'rtl start') { // bot joins channel and plays radio

		if (msg.member.voice.channel) {

            try {

                audioChannel = await msg.member.voice.channel.join();
                printMessage(`Channel ${msg.channel.name} at server ${msg.guild.name}: Bot joined voice channel ${msg.member.voice.channel.name}`);

            } catch(err) {

                console.log(err);
            }
            dispatcher = audioChannel.play('https://stream.89.0rtl.de/live/mp3-256/direktlinkHP/'); // 256 kbps
            // https://stream.89.0rtl.de/live/mp3-128/direktlinkHP/ 128 kbps
        }

    } else if (msg.content == 'rtl stop') { // stops music, bot leaves voice channel

        printMessage(`Channel ${msg.channel.name} at server ${msg.guild.name}: Bot has been stopped`);
        dispatcher.end();
        msg.member.voice.channel.leave();
        voicechannel = undefined;

    }
});

// leave voice channel if no users are left

client.on('voiceStateUpdate', (oldState, newState) => {

    if (audioChannel) {

        if (audioChannel.channel.members.size == 1) { // only the bot is in the voice channel; can leave it

            printMessage(`Leaving ${audioChannel.channel.name}: No users`);
            audioChannel.channel.leave();
        }
    }
});

client.login(token);

// link: https://discord.com/api/oauth2/authorize?client_id=788485025829486633&scope=bot&permissions=3145728