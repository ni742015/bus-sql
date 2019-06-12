export default ({
	Sequelize,
	examples,
	models,
	tag,
	decorator: {
		request,
		summary,
		body,
		middlewares,
		path,
		description,
		query,
		responses
	},
	ApiError,
	ApiErrorNames
}) => {
	class Auth {

	}

	return {
		commonApiConfig: {
			// inherit common api
			name: 'auth',
			baseUrl: 'auth'
		},
		ApiClass: Auth
	}
}
