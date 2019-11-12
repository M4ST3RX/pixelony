class Table {
	constructor(){
		this.command = 'table'
	}
	
	cmdFunction(args, bot, message){
		let usage = 'Usage: `?table <create|delete|view> <table>`'
		if(args[0] == 'create'){
			if(args[1] === undefined) {
				message.channel.send('You haven\'t specified a table name.')
			} else {
				bot.database.createTable(message, args[1])
			}
		} else if(args[0] == 'delete') {
			if(args[1] === undefined) {
				message.channel.send('You haven\'t specified a table name.')
			} else {
				bot.database.removeTable(message, args[1])
			}
		} /*else if(args[0] == 'list') {
			if(args[1] == undefined) {
				message.channel.send('You haven\'t specified a table name.')
			} else {
				bot.database.listColumnsInTable(message, args[1])
			}
		}*/ else if(args[0] == 'view') {
			if(args[1] === undefined) {
				message.channel.send('You haven\'t specified a table name.')
			} else {
				bot.database.viewData(bot, message, args[1])
			}
		} else {
			message.channel.send(usage)
		}
	}
}

module.exports = Table