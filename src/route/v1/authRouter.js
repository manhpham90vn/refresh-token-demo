import { authController } from '@/controller/auth'
import validate from '@/middleware/validate'
import { authValidator } from '@/validator/auth'
import express from 'express'

const authRouter = express.Router()

authRouter.post(
	'/register',
	validate(authValidator.register),
	authController.register
)

authRouter.post('/login', validate(authValidator.login), authController.login)

authRouter.post(
	'/logout',
	validate(authValidator.logout),
	authController.logout
)

authRouter.post(
	'/refreshToken',
	validate(authValidator.refreshTokens),
	authController.refreshToken
)

export default authRouter
