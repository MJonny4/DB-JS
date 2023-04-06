const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');
require("dotenv").config();

const commands = [
  {
    name: 'add',
    description: 'Adds two numbers together.',
    options: [
        {
            name: 'first',
            description: 'The first number',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'second',
            description: 'The second number',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();
