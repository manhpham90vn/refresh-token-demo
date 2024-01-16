import env from '@/config/env'
import logger from '@/config/logger'
import morgan from 'morgan'

const combinedFormat =
	':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":referrer" ":user-agent"'

const morganHandler = morgan(combinedFormat, {
	skip: () => env.NODE_ENV === 'test',
	stream: { write: (message) => logger.info(message.trim()) }
})

export default morganHandler
