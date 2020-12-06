const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const Token = process.env.BOT_TOKEN;

client.on('ready', () => {
    client.user.setActivity('vote master', { type: 'PLAYING' });
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    console.log(msg.content);
    if(msg.content[0] != '#') return; // No bot command - return

    const commandParams = (msg.content.toLowerCase().substring(1).split(' '));

    console.log(commandParams);


    if (commandParams[0] === 'ping') {
        msg.react('🏓').then(console.log).catch(console.error());
    }
    if(commandParams[0] === 'coffe'){
        console.log(msg);
        msg.react('☕').then(console.log).catch(console.error());
    }

    
});

client.login(Token);