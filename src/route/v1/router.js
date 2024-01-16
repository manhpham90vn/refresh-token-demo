import prisma from '@/config/database'
import authRouter from '@/route/v1/authRouter'
import express from 'express'
import StatusCodes from 'http-status-codes'
import userRouter from './userRouter'

const router = express.Router()

router.get('/health', async (req, res) => {
	await prisma.$executeRaw`SELECT 1;`
	res.status(StatusCodes.OK).send({ message: 'OK' })
})

router.use('/auth', authRouter)

router.use('/user', userRouter)

const APIs_V1 = router

export default APIs_V1
