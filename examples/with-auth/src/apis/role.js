export default ({
	examples,
	models,
	tag,
	Sequelize,
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
	const roleModel = models.role
	const authModel = models.auth
	const Op = Sequelize.Op

	class Role {
		@request('POST', '/roles')
		@summary('新建')
		@tag
		@responses(examples.role)
		static async create(ctx) {
			const {body} = ctx.request
			const auths = await authModel.findAll({where: {id: {[Op.in]: body.auths}}})
			const role = await roleModel.create(body)
			await role.setAuths(auths)
			ctx.body = role
		}

		@request('PUT', '/roles/{id}')
		@summary('修改')
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

			const auths = await authModel.findAll({where: {id: {[Op.in]: body.auths}}})
			const role = await roleModel.findByPk(id)
			await role.update(body)
			await role.setAuths(auths)

			ctx.body = role

		}
	}

	return {
		commonApiConfig: {
			// inherit common api
			name: 'roles',
			baseUrl: 'roles'
		},
		ApiClass: Role
	}
}
