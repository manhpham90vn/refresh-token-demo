import { postRepository } from '@/repository/postRepository'
import catchAsync from '@/utils/catchAsync'
import { StatusCodes } from 'http-status-codes'

const createPost = catchAsync(async (req, res) => {
	const post = await postRepository.createPost(req.body, req.user.id)
	res.status(StatusCodes.CREATED).send({ data: post })
})

const getPosts = catchAsync(async (req, res) => {
	const post = await postRepository.getPosts(req.query)
	res.status(StatusCodes.CREATED).send({ data: post })
})

export const postController = {
	createPost,
	getPosts
}
