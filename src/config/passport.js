import { JWT_SECRET } from '@/config/constants'
import prisma from '@/config/database'
import { tokenRepository } from '@/repository/tokenRepository'
import { ExtractJwt, Strategy } from 'passport-jwt'

const jwtOptions = {
	secretOrKey: JWT_SECRET,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify = async (payload, done) => {
	try {
		if (payload.type !== tokenRepository.tokenTypes.ACCESS) {
			throw new Error('Invalid token type')
		}
		const user = await prisma.user.findFirst({ where: { id: payload.sub } })
		if (!user) {
			return done(null, false)
		}
		done(null, user)
	} catch (error) {
		done(error, false)
	}
}

const jwtStrategy = new Strategy(jwtOptions, jwtVerify)

export default jwtStrategy
