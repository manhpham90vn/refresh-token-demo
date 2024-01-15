import env from '@/config/env'
import express from 'express'

const app = express()

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(env.PORT, env.HOST, () => {
	// eslint-disable-next-line no-console
	console.log(
		`Server running at http://${env.HOST}:${env.PORT}/ env:${env.NODE_ENV}`
	)
})
