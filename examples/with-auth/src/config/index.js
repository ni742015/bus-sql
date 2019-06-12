const base = {
	port: 3000,
	apiPrefix: 'api',
	db: {
		'database': 'msmz',
		'username': 'root',
		'password': '123123',
		'config': {
			'host': 'localhost',
			'port': '3306',
		},
	},
	swaggerConfig: {
		title: 'Swagger Test'
	},
	cors: {
		credentials: true,
	},
	jwt: {
		secret: 'bus',
		excludeUrls: [
			/.+/
		]
	}
}

const conifg = {
	test: {
		port: 3003
	}
}

export default Object.assign(base, conifg[process.env.PRO_ENV])
