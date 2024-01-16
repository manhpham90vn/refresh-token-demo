import {
	JWT_ACCESS_EXPIRATION_MINUTES,
	JWT_REFRESH_EXPIRATION_MINUTES,
	JWT_SECRET
} from '@/config/constants'
import prisma from '@/config/database'
import jwt from 'jsonwebtoken'
import moment from 'moment'

const tokenTypes = {
	ACCESS: 'ACCESS_TOKEN',
	REFRESH: 'REFRESH_TOKEN'
}

const generateAuthTokens = async (user) => {
	const accessTokenExpires = moment().add(
		JWT_ACCESS_EXPIRATION_MINUTES,
		'minutes'
	)
	const accessToken = generateToken(
		user.id,
		accessTokenExpires,
		tokenTypes.ACCESS
	)

	const refreshTokenExpires = moment().add(
		JWT_REFRESH_EXPIRATION_MINUTES,
		'minutes'
	)
	const refreshToken = generateToken(
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH
	)

	await saveToken(
		refreshToken,
		user.id,
		refreshTokenExpires,
		tokenTypes.REFRESH
	)

	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate()
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate()
		}
	}
}

const generateToken = (userId, expires, type) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type
	}
	return jwt.sign(payload, JWT_SECRET)
}

const saveToken = async (refreshToken, userId, expires, type) => {
	const token = await prisma.token.create({
		data: {
			token: refreshToken,
			userId: userId,
			type: type,
			expires: expires.toDate()
		}
	})
	return token
}

export const tokenRepository = {
	generateAuthTokens,
	tokenTypes
}
