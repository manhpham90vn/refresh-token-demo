import corsOptions from '@/config/cors'
import env from '@/config/env'
import logger from '@/config/logger'
import morganHandler from '@/config/morgan'
import jwtStrategy from '@/config/passport'
import errorHandler from '@/middleware/errorHandler'
import APIs_V1 from '@/route/v1/router'
import exitHook from 'async-exit-hook'
import cors from 'cors'
import express from 'express'
import passport from 'passport'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

if (env.NODE_ENV !== 'test') {
	app.use(morganHandler)
}

app.use('/v1', APIs_V1)

app.use(errorHandler)

app.listen(env.PORT, env.HOST, () => {
	logger.info(
		`Server running at http://${env.HOST}:${env.PORT}/ env:${env.NODE_ENV}`
	)
})

exitHook(() => {
	logger.error('Server is shutting down...')
})
