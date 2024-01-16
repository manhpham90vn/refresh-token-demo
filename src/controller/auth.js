import { authRepository } from '@/repository/authRepository'
import { tokenRepository } from '@/repository/tokenRepository'
import catchAsync from '@/utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

const register = catchAsync(async (req, res) => {
	const user = await authRepository.createUser(req.body)
	const tokens = await tokenRepository.generateAuthTokens(user)
	res.status(StatusCodes.CREATED).send({ data: user, token: tokens })
})

const login = catchAsync(async (req, res) => {
	const user = await authRepository.login(req.body)
	const tokens = await tokenRepository.generateAuthTokens(user)
	res.status(StatusCodes.OK).send({ data: user, token: tokens })
})

const logout = catchAsync(async (req, res) => {
	await authRepository.logout(req.body.refreshToken)
	res.status(StatusCodes.OK).send({ success: true })
})

const refreshToken = catchAsync(async (req, res) => {
	const tokens = await tokenRepository.refreshToken(req.body.refreshToken)
	res.status(StatusCodes.OK).send({ success: true, token: tokens })
})

export const authController = {
	register,
	login,
	logout,
	refreshToken
}
