import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load({ params }) {
	const { slug } = params;

	const article = await prisma.article.findUnique({
		where: { slug },
		include: {
			group: true
		}
	});

	if (!article) {
		throw error(404, 'Статья не найдена');
	}

	/* Навигация теперь в корневом layout */
	/*
	const groups = await prisma.group.findMany({ ... });
	// ... логика переехала в +layout.server.js ...
	*/

	return {
		article
	};
}
