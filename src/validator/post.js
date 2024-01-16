import Joi from 'joi'

const createPost = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		content: Joi.string()
	})
}

const getPosts = {
	query: Joi.object().keys({
		page: Joi.number().integer().default(1),
		size: Joi.number().integer().default(10)
	})
}

export const postValidator = {
	createPost,
	getPosts
}
