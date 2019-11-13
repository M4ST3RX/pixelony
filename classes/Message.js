class Message {
	constructor(message){
		this.message = message
	}
	
	send(msg){
		this.message.channel.send(msg)
	}
	
	sendToChannel(channelName, msg){
		const channel = this.message.guild.channels.find(ch => ch.name === channelName.toString())
		if (!channel) { return }
		channel.send(msg)
	}
}

module.exports = Message