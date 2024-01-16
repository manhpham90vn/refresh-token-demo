import prisma from '@/config/database'

const createPost = async (postData, authorId) => {
	const { title, content } = postData
	const post = await prisma.post.create({
		data: {
			title,
			content,
			authorId: authorId
		}
	})
	return post
}

const getPosts = async (query) => {
	const { page, size } = query
	const posts = await prisma.post.findMany({
		skip: (page - 1) * size,
		take: size
	})
	return posts
}

export const postRepository = {
	createPost,
	getPosts
}
