import Bus from 'bus-core-sql'
import Api from './apis'
import Schema from './schemas'
import config from './config'
import auth from './utils/auth'

const bus = new Bus({
	config,
	Api,
	Schema,
	hooks: {
		onInitApi(tagName, apiClass, args) {
			args.auth = auth
		}
	}
})

/* eslint-disable no-unused-vars */
bus.start().then(app => {
	/* eslint-disable no-console */
	console.info('app start success')
	// return bus.sequelize.sync({ force: true })
})

export default bus
