import express from 'express'
import env from '@/config/env'

const app = express()

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(env.PORT, env.HOST, () => {
	console.log(
		`Server running at http://${env.HOST}:${env.PORT}/ env:${env.NODE_ENV}`
	)
})
