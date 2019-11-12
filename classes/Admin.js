class Admin {
	constructor(adminChannel){
		this.loadedClasses = []
		if(adminChannel === undefined) { throw new Error('Admin channel is not defined.') }
		this.adminChannel = adminChannel
	}
	
	registerCommands(botInstance){
		let self = this
		let normalizedPath = require("path").join(__dirname, "admin")

		require("fs").readdirSync(normalizedPath).forEach(function(file) {
			let Obj = require("./admin/" + file)
			let cls = new Obj()
			botInstance.command.add('?', cls.command, cls.cmdFunction, self.adminChannel)
			return cls
		})
	}
}

module.exports = Admin