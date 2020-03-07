const ytdl = require("ytdl-core")
const ytSearch = require("yt-search")

class Music {
	constructor(bot, musicChannel, options){
		this.client = bot
		this.isConnected = false
		this.channel = musicChannel
		this.connection = undefined
		this.dispatcher = undefined
		this.options = options
		this.volume = 0.2
		this.isLooping = false
		this.currentlyPlaying = ""
	}
	
	start(prefix) {
		this.client.command.add(prefix, 'connect', connect, this.channel)
		this.client.command.add(prefix, 'disconnect', disconnect, this.channel)
		this.client.command.add(prefix, 'play', play, this.channel)
		this.client.command.add(prefix, 'volume', volume, this.channel)
		this.client.command.add(prefix, 'search', search, this.channel)
		this.client.command.add(prefix, 'pause', pause, this.channel)
		this.client.command.add(prefix, 'stop', stop, this.channel)
		this.client.command.add(prefix, 'resume', resume, this.channel)
		this.client.command.add(prefix, 'loop', loop, this.channel)
	}
}

function connect(args, bot, message){
	let self = bot.music
	if (message.member.voice.channel) {
		message.member.voice.channel.join().then(conn => {
			message.channel.send('Connected to channel `'+ message.member.voice.channel.name +'`!')
			self.isConnected = true
			self.connection = conn
		}).catch(console.log)
    } else {
      message.channel.send('<@'+message.author.id+'> You need to join a voice channel first!')
    }
}

function disconnect(args, bot, message){
	let self = bot.music
	let client = bot.client
	if(self.isConnected){
		client.channels.fetch(message.member.voice.channel.id).then(channel => {
			channel.leave()
		})
		self.isConnected = false
		self.dispatcher = undefined
		message.channel.send('Disconnected!')
	} else {
		message.channel.send('I am not connected to any voice channel.')
	}
}

function search(args, bot, message){
	if(args.length === 0) return
	let self = bot.music
	if(self.isConnected) {
		ytSearch(args.join(' '), (err, res) => {
			if(err) return message.channel.send("Something went wrong")
			
			console.log(args)
		
			let videos = res.videos.slice(0, 10)
			let resp = ""
			for(let i in videos){
				if(typeof(videos[i]) !== "function") {
					resp += `[**${parseInt(i)+1}**] \`${videos[i].title}\` (${videos[i].timestamp})\n`
				}
			}
			resp += `\nChoose a number between \`1-${videos.length}\` or enter \`0\` to exit`
			console.log(resp)
			message.channel.send(resp)
			
			const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content >= 0
			const collector = message.channel.createMessageCollector(filter)
			collector.videos = videos
			collector.once('collect', function(m){
				if(!isNaN(m.content) && m.content >= 0 && m.content < 11){
					if(parseInt(m.content) === 0) {
						message.channel.send("Search cancelled.")
						collector.stop()
					} else {
						play([[videos[parseInt(m.content)-1]]], bot, message)
					}
				}
			})
		})
	} else {
		message.channel.send("I am not connected to any voice channel.")
	}
}

function play(args, bot, message){
	if(!args[0]) return
	let self = bot.music
	//self.dispatcher = undefined
	if(self.isConnected){
		let url = args[0]
		if(url instanceof Array){
			const stream = ytdl("https://www.youtube.com"+url[0].url, { filter : 'audioonly', highWaterMark: 1<<25 })
			self.currentlyPlaying = "https://www.youtube.com"+url[0].url
			self.dispatcher = self.connection.play(stream, self.options)
			message.channel.send(`Now playing: \`${url[0].title}\``)
		} else {
			if(url.startsWith("https://youtube.com/watch?v=") || url.startsWith("https://www.youtube.com/watch?v=") || url.startsWith("https://youtu.be/")){
				self.currentlyPlaying = url
				const stream = ytdl(url, { filter : 'audioonly', highWaterMark: 1<<25 })
				self.dispatcher = self.connection.play(stream, self.options)
			}
		}
		
		self.dispatcher.on('end', function(reason){
			if(self.isLooping) {
				play([self.currentlyPlaying], bot, message)
			}
		})
	} else {
		message.channel.send('I am not connected to any voice channel!')
	}
}

function stop(args, bot, message){
	if(args.length !== 0) return
	let self = bot.music
	if(self.dispatcher) {
		self.isLooping = false
		self.dispatcher.end()
		message.channel.send('Music stopped!')
	}
	self.dispatcher = undefined
}

function pause(args, bot, message){
	if(args.length !== 0) return
	let self = bot.music
	if(self.dispatcher && !self.dispatcher.paused) {
		self.dispatcher.pause()
		message.channel.send('Music paused!')
	}
}

function resume(args, bot, message){
	if(args.length !== 0) return
	let self = bot.music
	if(self.dispatcher && self.dispatcher.paused) {
		self.dispatcher.resume()
		message.channel.send('Music resumed')
	}
}

function loop(args, bot, message){
	if(args.length !== 0) return
	let self = bot.music
	if(self.dispatcher && !self.dispatcher.paused) {
		if(!self.isLooping) {
			self.isLooping = true
			message.channel.send("Loop is turned **ON**")
		} else {
			self.isLooping = false
			message.channel.send("Loop is turned **OFF**")
		}
	}
}

function volume(args, bot, message){
	let self = bot.music
	if(self.dispatcher) {
		if(args[0] === undefined) {
			message.channel.send("The current volume is set to " + self.dispatcher.volume * 100)
		} else {
			let vol = args[0]
			if(vol >= 0 && vol <= 100 && !isNaN(vol)) {
				self.options.volume = vol / 100
				self.dispatcher.setVolume(vol / 100)
				message.channel.send("Volume is set to " + vol)
			} else {
				message.channel.send("Volume must be between 0 and 100")
			}
		}
	}
}

module.exports = Music