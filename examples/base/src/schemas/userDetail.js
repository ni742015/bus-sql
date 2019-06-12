export default function (Sequelize) {
	return {
		schema: {
			name: {
				type: Sequelize.STRING(50),
			},
			address: {
				type: Sequelize.STRING(),
			},
			sex:{
				type: Sequelize.INTEGER
			}
		},
		extend: {
			associate(models, curModel) {
				let {user} = models
				curModel.belongsTo(user)
			}
		}

	}
}
