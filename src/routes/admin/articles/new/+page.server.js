import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '$lib/server/auth';

const prisma = new PrismaClient();

export const load = async ({ locals }) => {
	requireAuth(locals);
	
	const groups = await prisma.group.findMany({
		orderBy: { order: 'asc' }
	});

	return { groups };
};

export const actions = {
	default: async ({ request, locals }) => {
		requireAuth(locals);

		const data = await request.formData();
		const title = data.get('title');
		const slug = data.get('slug');
		const content = data.get('content');
		const groupId = data.get('groupId') || null;

		if (!title || !slug || !content) {
			return fail(400, { error: 'Пожалуйста, заполните необходимые поля', title, slug, groupId });
		}

		// Простая проверка URL
		const existing = await prisma.article.findUnique({
			where: { slug: slug.toString() }
		});

		if (existing) {
			return fail(400, { error: 'Статья с таким URL уже существует', title, slug, groupId });
		}

		try {
			await prisma.article.create({
				data: {
					title: title.toString(),
					slug: slug.toString(),
					content: content.toString(),
					groupId: groupId ? groupId.toString() : null,
					published: true // Сразу публикуем
				}
			});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Ошибка при сохранении статьи' });
		}

		throw redirect(303, '/admin');
	}
};
