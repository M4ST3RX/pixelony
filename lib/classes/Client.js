
let DiscordClient = require("./DiscordClient")

class Client extends DiscordClient {
	constructor(token){
		super()
		this.token = token
	}
	
	addServices(services){
		this.services = services
	}
	
	login() {
		let client = require('discord-rich-presence')('503643008651231252');
		client.updatePresence({
		  state: 'Writing Modules',
		  details: 'Scripting',
		  startTimestamp: Date.now(),
		  endTimestamp: Date.now() + 60000 * 60,
		  largeImageKey: 'nodejs',
//		  smallImageKey: 'nodejs',
		  instance: true,
		});
		this.discordClient.login(this.token)
	}
}

module.exports = Client