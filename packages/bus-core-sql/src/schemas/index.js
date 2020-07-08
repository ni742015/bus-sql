const Sequelize = require('sequelize')

function formatExample(data) {
	const newData = {}
	// const newData = _.cloneDeep(data)
	for (const key in data) {
		if (data.hasOwnProperty(key)) {
			const item = Object.assign({}, data[key])
			// console.log('data instanceof Sequelize.type', item.key, item)
			if (item.type) {
				item.type = (
					item.typeSwagger ||
					item.type.name ||
					item.type.key
				).toLowerCase()
			} else {
				item.type = item.name || item.key
			}

			newData[key] = item
		}
	}
	return newData
}

class Schema {
	constructor(props = {}) {
		this.onInitSchema = props.onInitSchema
		this.datas = []
	}

	// data {name: '', schema: {}}
	add = data => {
		this.datas.push(data)
	}

	init = async ({ hooks }) => {
		let schemas = {},
			examples = {}

		for (const { name, schema, schemaName } of this.datas) {
			try {
				let schemaObj = schema(Sequelize)
				// hook
				if (hooks.onInitSchema) {
					let formatedData = await hooks.onInitSchema(name, schemaObj)
					schemaObj = formatedData ? formatedData : schemaObj
				}
				schemaObj.schemaName=schemaName
				// console.log('schema name:', name)
				examples[name] = formatExample(schemaObj.schema)
				schemas[name] = schemaObj
				// // handle boolean
				// if(item.type === 'boolean') {
				// 	item.get = function() {
				// 		return this.getDataValue(key)===1? true:false
				// 	}
				// }
			} catch (error) {
				console.warn(`Init Schemas Error: ${name}`, error)
				throw error
			}
		}

		return {
			schemas,
			examples
		}
	}
}

module.exports = Schema
