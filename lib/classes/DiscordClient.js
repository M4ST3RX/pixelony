
let Discord = require("discord.js")

class DiscordClient {
	constructor() {
		if(global.discordClient === undefined) {
			global.discordClient = new Discord.Client(); 
		}
		this.discordClient = global.discordClient
	}
}

module.exports = DiscordClient