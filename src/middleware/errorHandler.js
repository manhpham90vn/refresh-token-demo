import env from '@/config/env'
import logger from '@/config/logger'
import { StatusCodes } from 'http-status-codes'

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
	if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

	const responseError = {
		statusCode: err.statusCode,
		message: err.message || StatusCodes[err.statusCode],
		stack: err.stack
	}

	logger.info({ ...responseError })

	if (env.NODE_ENV !== 'dev') {
		delete responseError.stack
	}

	res.status(responseError.statusCode).json(responseError)
}

export default errorHandler
