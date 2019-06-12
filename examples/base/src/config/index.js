const base = {
	port: 3000,
	apiPrefix: 'api',
	db: {
		'database': 'test',
		'username': 'root',
		'password': 'root',
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
			/\/user\/login/
		]
	}
}

const conifg = {
	test: {
		port: 3003
	}
}

export default Object.assign(base, conifg[process.env.PRO_ENV])
