class Database {
	constructor(type, options){
		const knex = require('knex')
		this.options = options
		this.type = type
		this.connection = knex({
		  client: type,
		  connection: options,
		  useNullAsDefault: true
		})
	}
}

module.exports = Database