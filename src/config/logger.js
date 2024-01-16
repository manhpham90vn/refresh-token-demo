import env from '@/config/env'
import { createLogger, format, transports } from 'winston'

const logger = createLogger({
	level: 'info',
	format: format.combine(
		env.NODE_ENV === 'dev' ? format.colorize() : format.uncolorize(),
		format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
		format.printf(
			(info) =>
				`${info.timestamp} ${info.level}: ${info.message} ${
					info.statusCode || ''
				} ${info.stack || ''}`
		)
	),
	defaultMeta: { service: 'refresh-token-demo-api' },
	transports: [
		new transports.File({ filename: 'logs/error.log', level: 'error' }),
		new transports.File({ filename: 'logs/combined.log' })
	]
})

if (env.NODE_ENV !== 'production') {
	logger.add(new transports.Console())
}

export default logger
