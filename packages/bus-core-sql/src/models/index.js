// const helpers = require('./helpers')

class Models {
	constructor(props = {}) {
		this.onInitModels = props.onInitModels
		this.datas = []
		this.models = {}
	}

	// data {name: '', model: {}}
	add = (data) => {
		this.datas.push(data)
	}

	init = async ({sequelize, schemas, hooks}) => {
		try {
			const models = {}
			const associateObj = {}
			for (const name in schemas) {
				let {schema, extend = {}} = schemas[name]
				let {associate} = extend
				associate && (associateObj[name] = associate)

				let Schema = sequelize.define(name.replace(name[0], name[0].toUpperCase()), schema, Object.assign({
					timestamps: true,
				}, extend))

				// hook
				if(hooks.onInitModels) {
					let formatedSchema = await hooks.onInitModels(name, Schema)
					Schema = formatedSchema ? formatedSchema : Schema
				}

				models[name] = Schema
			}

			// 用model拓展Schema
			for(const {name: m_name, model} of this.datas) {
				model(models[m_name], models)
			}

			Object.assign(this.models, models)
			Object.keys(associateObj).forEach(function (modelName) {
				associateObj[modelName](models, models[modelName])
			})

			return models
		} catch (error) {
			console.warn('Init Models Error', error)
			throw error
		}
	}
}

module.exports = Models
