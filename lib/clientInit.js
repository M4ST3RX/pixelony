exports.default = clientInit

let ServiceRegister = require("./classes/ServiceRegister")
let Client = require("./classes/Client")

function clientInit(config){
	let services = []
	
	if(typeof config === 'object'){
		if(!config.token) throw new Error('Client token is not defined in config.')
		if(config.services){
			Object.entries(config.services).forEach((service) => {
				services.push(new ServiceRegister(service))
			})
		}
	}
	
	const newClient = new Client(config.token)
	
	newClient.addServices(services)
	
	newClient.login()
	
	return newClient
	//console.log(this)
}

module.exports = exports.default