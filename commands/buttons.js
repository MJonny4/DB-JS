const { Client, IntentsBitField, Events, ActionRowBuilder, ButtonStyle, ButtonBuilder } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

const roles = [
    {
        id: '1093485550775840778',
        label: '🔴 Red',
        color: 0xFF0000,
    },
    {
        id: '1093485444198572102',
        label: '🟢 Green',
        color: 0x00FF00,
    },
    {
        id: '1093485600386072586',
        label: '🔵 Blue',
        color: 0x0000FF,
    },
]

client.once(Events.ClientReady, async (c) => {
    try {
        const channel = client.channels.cache.get('909880242737385472');
        if (!channel) return;

        const row = new ActionRowBuilder();
        roles.forEach(role => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel(role.label)
                .setStyle(ButtonStyle.Primary)
            );
        });

        channel.send({
            content: 'Choose a color',
            components: [row],
        });
    } catch (error) {
        console.log(error);
    }
});

client.login(process.env.TOKEN);
