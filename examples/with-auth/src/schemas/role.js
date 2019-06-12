export default function (Sequelize) {
	return {
		schema: {
			name: {
				type: Sequelize.STRING,
			},
			status: {
				type: Sequelize.INTEGER,
			},
			description: {
				type: Sequelize.STRING(200),
			},
			landingRoute:{
				type: Sequelize.STRING(50)
			}
		},
		extend: {
			associate(models, curModel) {
				let {user, auth} = models
				curModel.belongsToMany(user, {through: 'UserRole', foreignKey: 'roleId', as: 'users'})
				curModel.belongsToMany(auth, {through: 'RoleAuth', foreignKey: 'roleId', as: 'auths'})
			}
		}
	}
}
