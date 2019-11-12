
let CommandHandler = require("../handlers/CommandHandler")

class Commands extends CommandHandler {
	constructor() {
		super()
	}
	
	registerService(serviceName){
		this.handleCommands()
		console.log("Commands service has been registered")
	}
}

module.exports = Commands