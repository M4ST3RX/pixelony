class Rules {	
	constructor(rulesFile, botInstance){
		this.message = botInstance.message
		let self = this
		let rules = require(rulesFile)
		this.embed = new botInstance.discord.MessageEmbed()
		Object.keys(rules).forEach(function(key){
			let body = ""
			let ruleSection = rules[key]
			if(ruleSection['title'] === undefined) { throw new Error('Rules: Section title is not defined!') }
			if(ruleSection['separator'] === undefined) { throw new Error('Rules: Section line separator is not defined!') }
			let title = ruleSection["title"]
			let separator = ruleSection["separator"]
			Object.keys(ruleSection).forEach(function(key){
				if(!isNaN(key)){
					body = body + ruleSection[key] + separator
				}
			})
			self.embed.addField(title, body)
		})
	}
	
	setFooter(footerText){
		this.embed.setFooter(footerText)
		return this
	}
	
	send(args, bot, message){
		if(args.length === 1){
			let rulesChannel = message.guild.channels.find(ch => ch.name == args[0]).toString()
			bot.message.sendToChannel(args[0], bot.rules.embed)
			bot.message.sendToChannel(bot.admin.adminChannel, "Your rules have been sent to " + rulesChannel)
			bot.rules.embed = undefined
		} else {
			message.channel.send('Usage: `!rules <channel>`')
		}
	}
}

module.exports = Rules