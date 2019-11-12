
let Client = require("../classes/Client")

class CommandHandler extends Client {
	constructor() {
		super()
	}

	handleCommands(){
		this.discordClient.on('message', message => {
			
		})
	}
}

module.exports = CommandHandler