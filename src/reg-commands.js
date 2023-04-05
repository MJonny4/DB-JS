const {REST, Routes} = require('@discordjs/rest');
require("dotenv").config();

const commands = [
    {
        name: 'ping',
        description: 'Replies with Pong!'
    }
];  

const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            {body: commands},
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();