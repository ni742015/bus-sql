module.exports = model => ({
	createOrUpdate: async function (data, option) {
		let result = await model.findOne(option)
		if(result) {
			await result.update(data)
		} else {
			result = model.create(data)
		}
		return result
	}
})
