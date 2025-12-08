import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load() {
	const articles = await prisma.article.findMany({
		orderBy: { updatedAt: 'desc' },
		include: { group: true }
	});

	return { articles };
}
