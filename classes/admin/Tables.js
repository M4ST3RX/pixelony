class Tables {
	constructor(){
		this.command = "tables"
	}
	
	cmdFunction(args, bot, message){
		if(args.length === 0) {
			bot.database.listTables(bot, message)
		} else {
			message.channel.send('Usage: `?tables`')
		}
	}
}

module.exports = Tables