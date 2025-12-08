import { PrismaClient } from '@prisma/client';
import { requireAuth } from '$lib/server/auth';

const prisma = new PrismaClient();

export async function load() {
	const articles = await prisma.article.findMany({
		orderBy: { updatedAt: 'desc' },
		include: { group: true }
	});

	return { articles };
}

export const actions = {
	delete: async ({ request, locals }) => {
		requireAuth(locals);
		
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return;

		try {
			await prisma.article.delete({
				where: { id: id.toString() }
			});
		} catch (e) {
			console.error('Error deleting article:', e);
		}
	}
};
