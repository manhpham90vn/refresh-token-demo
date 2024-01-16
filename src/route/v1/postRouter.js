import { postController } from '@/controller/post'
import auth from '@/middleware/auth'
import validate from '@/middleware/validate'
import { postValidator } from '@/validator/post'
import express from 'express'

const postRouter = express.Router()

postRouter
	.post(
		'/',
		auth(),
		validate(postValidator.createPost),
		postController.createPost
	)
	.get('/', auth(), validate(postValidator.getPosts), postController.getPosts)

export default postRouter
