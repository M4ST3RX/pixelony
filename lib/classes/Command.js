class Command {
	constructor() {
		this.prefix
		this.command
		this.args
		this.channel
	}
	
	getPrefix(){
		return this.prefix
	}
	
	setPrefix(value) {
		this.prefix = value
		return this
	}
	
	getCommand(){
		return this.command
	}
	
	setCommand(value) {
		this.command = value
		return this
	}
	
	getArgs(){
		return this.args
	}
	
	setArgs(value) {
		if(typeof(value) !== "array") throw new Error("Argument at command registration must be array")
		this.args = value
		return this
	}
	
	getChannel(){
		return this.channel
	}
	
	setChannel(value) {
		this.channel = value
		return this
	}
	
	registerCommand() {
		
	}
}

module.exports = Command