const path = require('path')
const fs = require("fs")
let aliases = {}

class Command {
	constructor(){
		this.commands = []
	}
	
	add(prefix, command, func, channel = undefined){
		let alias = []
		if(fs.existsSync(path.dirname(require.main.filename) + "/alias.json")) {
			aliases = require(path.dirname(require.main.filename) + "/alias.json")
		}
		if(aliases[command]) {
			alias = aliases[command]
		}
		this.commands.push({"prefix": prefix, "command": command, "function": func, "channel": channel, "alias": alias})
	}
}

module.exports = Command