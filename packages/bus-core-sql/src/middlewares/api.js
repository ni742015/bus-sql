
/**
 * 处理resonse数据
 * 在app.use(router)之前调用
 */

const { filter_request_body } = require('../utils/index.js')
const ApiError = require('../utils/error/apiError')
const logUtil = require('../utils/log')

function Auth(authorization, ctx){
	console.log('authorization',authorization);

	if (authorization) {
		let token = authorization.indexOf(' ') >= 0 ? authorization.split(' ').pop() : authorization // Bearer xxx
		// 解码token
		const decode = this.Token.decode(token)
		if(!decode) {
			throw new ApiError(null, 401, 'Auth failed')
		}

		// ctx.state = undefined
		// if(this.hooks.onTokenCheck) {
		// 	ctx.state = await this.hooks.onTokenCheck(decode, ctx)
		// }
		// ctx.state = ctx.state || decode || {}
		ctx.state = decode || {}
		return decode
	} else {
		throw new ApiError(null, 401, 'There is no token')
	}
}
module.exports = async function(ctx, next) {
	const start_time = new Date()
	try {
		let {config: {jwt, apiPrefix}, hooks: {beforeApiEnter, beforeApiResolve}} = this
		ctx.start_time = start_time
		if(jwt) {
			if(new RegExp(`^/${apiPrefix}`).test(ctx.url)) {
				let Token = this.Token
				// 排除一些路径
				if(Token.checkUrl(ctx)) {
					let {authorization} = ctx.request.header
					if(this.hooks.onTokenCheck) {
						await this.hooks.onTokenCheck(ctx, Auth.bind(this))
					} else {
						Auth.call(this, authorization, ctx)
					}
				}
				// 去除不要的参数
				ctx.request.body = filter_request_body(ctx.request.body)
				// console.log('ctx.request.body', ctx.request.body);
			}
		}


		if(!beforeApiEnter || await beforeApiEnter(ctx, next) !== false) {
			//先去执行路由
			await next()
			if(ctx.url.indexOf(`/${apiPrefix}`) === 0 && ctx.url.indexOf('/swagger') < 0) {
				let body = {
					success: true,
					data: ctx.body
				}

				if(beforeApiResolve) {
					body = await beforeApiResolve(ctx)
				}

				if (body) {
					ctx.body = body
				}
			}
		}


		if(ctx.status === 404) {
			ctx.body = {
				success: false,
				data: new ApiError('resourcesNotExist')
			}
			ctx.status = 404
		}

	} catch (error) {
		// console.warn('api_handel error', error)
		//如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
		// if(error instanceof ApiError){
		ctx.response.status = error.status || 500

		if(this.hooks.onApiError) {
			this.hooks.onApiError(ctx, error)
		}

		!ctx.body && (ctx.body = {
			success: false,
			data: {
				message: error.message
			}
		})

		console.warn(`${start_time.toLocaleString()} Error: ${ctx.method} ${ctx.url}\n`, error)
		logUtil.logError( ctx, error, new Date() - start_time)
		// }
	}


}

