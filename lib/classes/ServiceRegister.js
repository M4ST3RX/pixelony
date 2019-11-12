
class ServiceRegister {
	constructor(service) {
		let ServiceClass = require("../services/" + service[0])
		let newService = new ServiceClass()
		newService.registerService()
	}
}

module.exports = ServiceRegister