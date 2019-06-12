import Bus from 'bus-core-sql'
import Api from './apis'
import Schema from './schemas'
import config from './config'

const bus = new Bus({
	config,
	Api,
	Schema
})

/* eslint-disable no-unused-vars */
bus.start().then(app => {
	/* eslint-disable no-console */
	console.info('app start success')
	// return bus.sequelize.sync({ force: true })
})

export default bus
