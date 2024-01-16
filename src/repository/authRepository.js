import prisma from '@/config/database'
import ApiError from '@/utils/ApiError'
import bcrypt from 'bcryptjs'
import { StatusCodes } from 'http-status-codes'

const createUser = async (userData) => {
	const { email, password, name } = userData
	if (await prisma.user.findFirst({ where: { email } })) {
		throw new ApiError(StatusCodes.BAD_REQUEST, 'Email already exists')
	}
	const user = await prisma.user.create({
		data: {
			email,
			password: bcrypt.hashSync(password, 10),
			name
		}
	})

	delete user.password
	return user
}

const login = async (userData) => {
	const { email, password } = userData
	const user = await prisma.user.findFirst({ where: { email } })
	const isPasswordMatch = await bcrypt.compare(password, user.password)
	if (!user || !isPasswordMatch) {
		throw new ApiError(StatusCodes.UNAUTHORIZED, 'Incorrect email or password')
	}
	delete user.password
	return user
}

const logout = async (refreshToken) => {
	const result = await prisma.token.findFirst({
		where: { token: refreshToken }
	})
	if (!result) {
		throw new ApiError(StatusCodes.NOT_FOUND, 'Not found')
	}
	await prisma.token.delete({ where: { id: result.id } })
}

export const authRepository = {
	createUser,
	login,
	logout
}
