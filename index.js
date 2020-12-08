const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require('node-fetch');
require('dotenv').config();


const discordToken = process.env.BOT_TOKEN;
const weatherToken = process.env.WEATHER_API_TOKEN;

client.on('ready', () => {
    client.user.setActivity('your command', { type: 'LISTENING' });
    console.log(`Logged in as ${client.user.tag}!`);
});

// On incoming messages...
client.on('message', async msg => {
    console.log(msg.content);

    if (msg.author.bot) return;

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
    if (commandParams[0] === 'chuck') {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json())
            .then(data => {
                let embededjoke = new Discord.MessageEmbed();
                embededjoke.description = data.value;
                msg.channel.send(embededjoke)
            });
    }
    if (commandParams[0] === 'weather') {
        if (!commandParams[1]) {
            msg.reply('Weather command needs a city parameter `#weather cityname`');
            return;
        }
        const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + commandParams[1] + '&appid=' + weatherToken + '&units=metric';
        fetch(url)
            .then(response => response.json())
            .then(data => {

                if (!data.name) msg.reply('Weather data not found or not recieved from api');

                const embed = new Discord.MessageEmbed();
                embed.title = data.name;
                embed.description = data.weather[0].main;
                embed.description += '\nTemp:' + data.main.temp;
                embed.description += '\nTemp min:' + data.main.temp_min;
                embed.description += '\nTemp max:' + data.main.temp_max;
                msg.channel.send(embed);
                console.log(data);
            });
    }

    if (commandParams[0] === 'createpoll') {
        // Logic to create poll
    }
});

client.login(discordToken);