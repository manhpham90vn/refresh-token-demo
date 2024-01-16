import catchAsync from '@/utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

const getUser = catchAsync(async (req, res) => {
	const user = { ...req.user }
	delete user.password
	res.status(StatusCodes.OK).send({ data: user })
})

export const userController = {
	getUser
}
