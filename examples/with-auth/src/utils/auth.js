export default (auths = []) => async (ctx, next) => {
	if (auths.length === 0) {
		await next()
	} else if (ctx.state) {
		console.log('ctx.state', ctx.state)

		const userAuths = ctx.state.auths || []
		let ifAuth = false
		userAuths.map(async userAuth => {
			auths.map(async auth => {
				if (userAuth === auth) {
					ifAuth = true
				}
			})
		})

		if (!ifAuth) {
			throw new Error('Api Auth Failed')
		}
		await next()

	} else {
		throw new Error('Api Auth Failed')
	}
}
