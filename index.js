const RokuIp = "192.168.0.179";
const Token = require("./config.json").Token
const http = require("http");
const Discord = require("discord.js");
let client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS] });

client.on("ready", () => {
	console.log("Ready!");
});

function post(path) {
	const options = {
		hostname: RokuIp,
		port: 8060,
		path: path,
		method: 'POST',
		headers: {
			'Content-Type': 'text/plain',
			'Content-Length': 0
		}
	}
	let req = http.request(options, (res) => {
		console.log(path + " => " + res.statusCode);
	});
	req.write("");
	req.end();
}


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}

	if(interaction.commandName == "action") {
		await action(interaction.options.getString("task"));
		await interaction.reply({content: `Done! (action = ${interaction.options.getString("task")})`, ephemeral: true});
	}

});


async function action(arg){

	switch(arg) {
		case "on":
			post("/keypress/powerOn");
			break;
		case "off":
			post("/keypress/powerOff");
			break;
		case "up":
			post("/keypress/up");
			break;
		case "down":
			post("/keypress/down");
			break;
		case "left":
			post("/keypress/left");
			break;
		case "right":
			post("/keypress/right");
			break;
		case "home":
			post("/keypress/Home");
			break;
	}
}

client.login(Token);