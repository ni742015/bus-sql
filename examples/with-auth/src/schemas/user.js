export default function (Sequelize) {
	return {
		schema: {
			username: {
				type: Sequelize.STRING(100),
				unique: true
			},
			password: Sequelize.STRING,
			name: Sequelize.STRING,
			status: Sequelize.INTEGER
		},
		extend: {
			associate(models, curModel) {
				let {role} = models
				curModel.belongsToMany(role, {through: 'UserRole', foreignKey: 'userId', as: 'roles'})
			}
		}

	}
}
