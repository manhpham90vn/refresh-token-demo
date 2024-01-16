import { userController } from '@/controller/user'
import auth from '@/middleware/auth'
import express from 'express'

const userRouter = express.Router()

userRouter.get('/', auth(), userController.getUser)

export default userRouter
