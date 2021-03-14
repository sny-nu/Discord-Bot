const Discord = require("discord.js");
require("dotenv").config();
const fetch = require("node-fetch");

const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);

client.on('message', async (msg) => {
    const regex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([\-\.]{1}[a-zA-Z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

    if (msg.content.match(regex) != null) {
        const url = await doCall(msg.content);

        await msg.channel.send(`Here is your short url: ${url}`);
        await msg.delete();
    }
});

async function doCall(url) {
    const response = await fetch("https://api.sny.nu/v1/url", 
    {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(
            { 
                originalUrl: url,
                safeRedirect: 0
            }
        )
    })
    .then(res => res.json())
    .catch(err => console.log(err))

    return response.shortUrl;
}

