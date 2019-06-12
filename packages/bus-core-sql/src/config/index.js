const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'build')
const publicBuildPath = path.join(buildPath, 'public')

module.exports = {
	port: 3333,
	rootPath,
	buildPath,
	publicBuildPath,
	serverSrcPath: path.join(rootPath, 'src'),
	serverBuildPath: buildPath,
	userNodeModulesPath: path.join(rootPath, 'node_modules'),
  publicPath: '/',
	logsPath: path.join(rootPath, 'logs'),
	db: {
		"database": "test",
		"username": "root",
		"password": "123456",
		"config": {
				"host": "localhost",
				"port": "3306",
				"dialect": "mysql",
				"timezone": "+08:00",
		},
	},
	apiPrefix: 'api'
}
