const { Client, IntentsBitField, Events, EmbedBuilder, ActivityType} = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
    console.log(`✅ ${c.user.tag} is Online!`);

    client.user.setActivity({
        name: 'Your Mom',
        type: ActivityType.Streaming,
        url: 'https://www.twitch.tv/bryanrivasgaming',
    });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'server') {
        const embed = new EmbedBuilder().setTitle('Server Information')
        .setDescription (`
        **Server Name:** ${interaction.guild.name}
        **Server ID:** ${interaction.guild.id}
        **Server Owner:** ${(await interaction.guild.fetchOwner()).displayName}
        **Server Member Count:** ${interaction.guild.memberCount}
        **Server Created At:** ${interaction.guild.createdAt.toLocaleString()}
        `)
        .setColor(0xFF0000)
        .setImage(interaction.guild.iconURL())
        .setTimestamp()
        .setAuthor(
            {
                name: `${interaction.guild.name}`,
                iconURL: `${interaction.guild.iconURL()}`,
            }
        )
        .setFooter(
            {
                text: `${interaction.user.tag}`,
                iconURL: `${interaction.user.avatarURL()}`,
            }
        );

        await interaction.reply({ embeds: [embed] });
    }
});

client.login(process.env.TOKEN);
