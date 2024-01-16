import { WHITELIST_DOMAINS } from '@/config/constants'
import env from '@/config/env'
import ApiError from '@/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const corsOptions = {
	origin: function (origin, callback) {
		if (env.NODE_ENV === 'dev') {
			return callback(null, true)
		}

		if (WHITELIST_DOMAINS.includes(origin)) {
			return callback(null, true)
		}

		return callback(
			new ApiError(
				StatusCodes.FORBIDDEN,
				`${origin} not allowed by our CORS Policy.`
			)
		)
	},

	optionsSuccessStatus: 200,

	credentials: true
}

export default corsOptions
