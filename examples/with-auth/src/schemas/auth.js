export default function (Sequelize) {
	return {
		schema: {
			name: {
				type: Sequelize.STRING(50),
			},
			code: {
				type: Sequelize.STRING(20),
			},
			description: {
				type: Sequelize.STRING(200),
			},
			title:{
				type: Sequelize.STRING(50)
			}
		},
		extend: {
			associate(models, curModel) {
				curModel.belongsToMany(models.role, {through: 'RoleAuth', foreignKey: 'authId'})
			}
		}

	}
}
