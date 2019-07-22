const Sequelize = require('sequelize')
const options = {
	host: 'localhost',
	port: '3306',
	dialect: 'mysql',
	timezone: '+08:00'
}

class DataBase {
	init(dbConfig, { hooks }) {
		let { database, username, password, config = {} } = dbConfig

		const sequelize = new Sequelize(
			database,
			username,
			password,
			Object.assign(options, config)
		)

		hooks.onInitDatabase && hooks.onInitDatabase(sequelize)

		return sequelize
	}
}

module.exports = new DataBase()
