export default function (Sequelize) {
	return {
		schema: {
			username: {
				type: Sequelize.STRING(100),
				unique: true
			},
			password: Sequelize.STRING,
			status: Sequelize.INTEGER
		},
		extend: {
			associate(models, curModel) {
				let {userDetail} = models
				curModel.hasMany(userDetail)
			}
		}

	}
}
