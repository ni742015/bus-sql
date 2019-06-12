module.exports = ({
	Sequelize,
	example,
	model,
	tag,
	info: {
		pathname,
		name,
		baseUrl
	},
	decorator: {
		request,
		summary,
		body,
		// middlewares,
		path,
		description,
		query,
		responses
	},
	// ApiError,
	// ApiErrorNames
}) => {
	let lowcase_pathname = baseUrl || pathname.replace(/[A-Z]/, str => str.toLowerCase())
	const Op = Sequelize.Op
	function rename(target) {
		if(target.name !== pathname) {
			Object.defineProperty(target, 'name', {get(){
				return pathname.replace(/^[a-z]/, (str) => str.toUpperCase())
			}})
		}
	}
	class Common {
		@rename
		static test() {}

		@rename
		@request('GET', `/${lowcase_pathname}/{id}`)
		@summary(`获取${name}详情`)
		@description('id不能为空')
		@tag
		@path({
			id: {
				type: 'string',
				required: true
			}
		})
		@responses(example)
		static async get(ctx) {
			const {id} = ctx.params

			return model
				.findByPk(id)
				.then(row => {
					ctx.body = row
				})
		}


		@rename
		@request('GET', `/${lowcase_pathname}`)
		@summary(`获取${name}列表`)
		@tag
		@query({
			page: {
				type: 'number',
				require: true,
				description: '页码'
			},
			pageCount: {
				type: 'number',
				require: true,
				description: '页数'
			},
			filter: {
				type: 'string',
				description: '过滤条件'
			},
		})
		@responses({
			rows: [example],
			total: {type: 'number'}
		})
		static async query(ctx) {
			let {page = 1, pageCount = 10, filter} = ctx.query
			page = parseInt(page, 10)
			pageCount = parseInt(pageCount, 10)
			const start = (page - 1) * pageCount

			// if(filter) {
			// 	find.where = {name:{$like:`%${filter}%`}}
			// }
			const {rows, count} = await model
				.findAndCountAll({
					offset:start,
					limit:pageCount
				})

			ctx.body = {
				items: rows,
				totalCount: count,
			}
		}


		@rename
		@request('POST', `/${lowcase_pathname}`)
		@summary(`新建${name}`)
		@tag
		@body(example)
		@responses(example)
		static async create(ctx) {
			return model.create(ctx.request.body).then(row => ctx.body = row)
		}


		@rename
		@request('PUT', `/${lowcase_pathname}/{id}`)
		@summary(`修改${name}`)
		@tag
		@path({
			id: {
				type: 'string',
				required: true
			}
		})
		@body(example)
		@responses(example)
		static async put(ctx) {
			const { params: {id}, request: {body}} = ctx

			return model.update(body, {where: {id}})
				.then(() => model.findByPk(id))
				.then(row => ctx.body = row)
		}


		@rename
		@request('DELETE', `/${lowcase_pathname}/{id}`)
		@summary(`删除${name}`)
		@tag
		@path({
			id: {
				type: 'string',
				required: true
			}
		})
		static async delete(ctx) {
			const { params: {id}} = ctx
			return model.destroy({where: {id}}).then(row => ctx.body = row)
		}


		@rename
		@request('DELETE', `/${lowcase_pathname}/batch`)
		@summary(`批量删除${name}`)
		@tag
		@body({
			ids: {
				type: 'array',
				required: true,
				example: []
			}
		})
		static async deleteBatch(ctx) {
			const { body: {ids}} = ctx.request
			return model.destroy({where: {id: {[Op.in]: ids}}})
				.then(row => ctx.body = row)
		}

	}


	return Common
}
