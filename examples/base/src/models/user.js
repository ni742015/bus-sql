const Sequelize = require('sequelize')
const Op = Sequelize.Op

export default (schema, models) => {
	const User = models.user
	const utils = {
		list(filter = '') {
			return User.findAndCount({
				where: {
					[Op.or]: [
						{'username': { [Op.like]: `%${filter}%` }},
						{'$UserDetails.name$': { [Op.like]: `%${filter}%` }},
					]
				},
				include: [{
					model: models.userDetail
				}]
			})
		}
	}

	Object.assign(User, utils)
}
