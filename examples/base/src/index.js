import Bus from 'bus-core-sql'
import Api from './apis'
import Model from './models'
import Schema from './schemas'
import config from './config'

const bus = new Bus({
	config,
	Api,
	Model,
	Schema,
	hooks: {
		onInitMiddlewares: async function(middlewares, app) {
			middlewares.before('_timer', {
				name: 'youzan',
				middleware: () => (ctx, next) => {
					console.log(1111)
					next()
				}
			})
		}
	}
})

/* eslint-disable no-unused-vars */
bus.start().then(app => {
	/* eslint-disable no-console */
	console.info('app start success')
	// return bus.sequelize.sync({ alter: true })
})

export default bus
