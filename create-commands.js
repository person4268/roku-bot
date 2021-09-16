const { REST } = require('@discordjs/rest');
const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { Routes } = require('discord-api-types/v9');
const { Token, clientId, guildId } = require("./config.json")

const commands = [
	new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
	new SlashCommandBuilder().addStringOption(option=>option.setName("task").setDescription("Action to do").setRequired(true)).setName('action').setDescription('Perform an action on the TV.'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(Token);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			//Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
