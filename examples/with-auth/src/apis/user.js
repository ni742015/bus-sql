import bus from '../index.js'

export default ({
	examples,
	models,
	tag,
	Sequelize,
	auth,
	decorator: {
		request,
		summary,
		body,
		middlewares,
		path,
		// description,
		// query,
		responses
	},
	ApiError,
	ApiErrorNames
}) => {
	const userModel = models.user
	const roleModel = models.role
	const userExample = examples.user
	const Op = Sequelize.Op

	class User {
		@request('POST', '/user/login')
		@summary('login api')
		@tag
		@body({
			username: {
				type: 'string',
				description: 'username'
			},
			password: {
				type: 'string',
				description: 'password'
			}
		})
		static async login(ctx) {
			const { username, password } = ctx.request.body
			let auths = []

			const user = await userModel
				.findOne({
					where: { username, password },
					include: [{
						model: models.role,
						as: 'roles',
						attributes: ['id', 'name', 'landingRoute'],
						include: [{
							model: models.auth,
							as: 'auths',
							attributes: ['id', 'code', 'name']
						}]
					}]
				})
				.then(res => {
					if (res && res.roles) {
						res.roles.map(item => {
							// const {auths} = item
							if(item) {
								item.auths && item.auths.map(auth => {
									auths.push(auth.code)
								})
							}

						})
						//数组去重
						auths = Array.from(new Set(auths))
					}
					return res
				})

			if (user) {
				let data = { name: user.name, auths }
				let token = bus.Token.create(data, '30d')

				ctx.body = {
					user: {
						...data,
						roles: user.roles
					},
					token
				}
			} else {
				throw new ApiError(ApiErrorNames.RESOURCES_NOT_EXIST)
			}
		}

		@request('POST', '/user')
		@summary('create user')
		// @middlewares([auth(['admin'])])
		@tag
		@body(userExample)
		@responses(userExample)
		static async register(ctx) {
			const {
				request: { body }
			} = ctx

			const roles = await roleModel.findAll({where: {id: {[Op.in]: body.roles}}})
			const user = await userModel.create(body)
			await user.setRoles(roles)

			ctx.body = user
		}

		@request('PUT', '/user/{id}')
		@summary('修改')
		@middlewares([auth(['admin'])])
		@tag
		@path({
			id: {
				type: 'string',
				required: true
			}
		})
		@responses()
		static async put(ctx) {
			const {
				params: { id },
				request: { body }
			} = ctx

			const roles = await roleModel.findAll({where: {id: {[Op.in]: body.roles}}})
			const user = await userModel.findByPk(id)
			await user.update(body)
			await user.setRoles(roles)

			ctx.body = user

		}
	}

	return {
		commonApiConfig: {
			// inherit common api
			name: '用户'
		},
		ApiClass: User
	}
}
