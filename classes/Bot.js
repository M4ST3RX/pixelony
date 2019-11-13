const Command = require('./Command')
const Database = require('./Database')
const Message = require('./Message')
const Rules = require('./Rules')
const Music = require('./Music')
const Admin = require('./Admin')
const ClassHelper = require('./ClassHelper.js')

class Bot {
	constructor(token){
		let self = this
		let Discord = require('discord.js')
		let client = new Discord.Client()
		this.id = ClassHelper.assignIdToBotClass()
		this.discord = Discord
		this.client = client
		this.command = new Command()
		this.rpc = require('discord-rich-presence')('180984871685062656')
		
		client.on('message', message => {
			if(!message.guild) return
			this.message = new Message(message)
			let msg = message.content
			let syntax = msg.substring(0, 1)
			let args = msg.substring(1).split(' ')
			let cmd = args[0]
			args.splice(0, 1)
			let commands = this.command.commands
			for(let key = 0; key < commands.length; key++) {
				let object = commands[key]
				if(object.prefix == syntax && (object.command.toLowerCase() == cmd.toLowerCase() || object.alias.includes(cmd.toLowerCase()))){
					if(object.channel === undefined || object.channel == message.channel.name) {
						object.function(args, self, message)
						break
					}
				}
			}
		})

		client.login(token)
		
		ClassHelper.addBotClass(Bot)
	}
	
	greeting(channelName, message){
		this.client.on('guildMemberAdd', member => {
			const channel = member.guild.channels.find(ch => ch.name === channelName.toString())
			if (!channel) return
			message = message.replace("{member}", `${member}`)
			channel.send(`${message}`)
		})
	}
	
	ready(options = {}) {
		if(options == {}) return
		let self = this
		this.client.on("ready", () => {
			console.log(`Logged in as ${self.client.user.tag}!\n`)
			if(options.activity){
				self.client.user.setActivity(options.activity.text, { type: options.activity.type })
			}
		})
	}
	
	createDatabase(type, options){
		if(type == "mysql") {
			return new Database(type, options)
		} else if(type == "sqlite3"){
			return new Database(type, options)
		} else {
			throw new Error("Cannot create database with type: " + type)
		}
		return this.database
	}
	
	admin(adminChannel){
		this.admin = new Admin(adminChannel)
		this.admin.registerCommands(this)
	}
	
	setRules(file){
		this.rules = new Rules(file, this)
		this.command.add('!', 'rules', this.rules.send, this.admin.adminChannel)
	}
	
	addMusic(musicChannel, options = { seek: 0, volume: 0.5 }){
		this.music = new Music(this, musicChannel, options)
		return this.music
	}
}

Array.prototype.diff = function (a) {
    return this.filter(function (i) {
        return a.indexOf(i) === -1
    })
}

module.exports = Bot