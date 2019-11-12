let botsArray = []
let id = 1

function assignIdToBotClass(){
	id = botsArray.length + 1
	return id
}

function addBotClass(botObject){
	botsArray.push(botObject)
}

module.exports.assignIdToBotClass = assignIdToBotClass
module.exports.addBotClass = addBotClass