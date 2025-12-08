import { fail, redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '$lib/server/auth';

const prisma = new PrismaClient();

export const load = async ({ locals, params }) => {
	requireAuth(locals);
	
	const article = await prisma.article.findUnique({
		where: { id: params.id }
	});

	if (!article) throw redirect(302, '/admin');

	const groups = await prisma.group.findMany({
		orderBy: { order: 'asc' }
	});

	return { article, groups };
};

export const actions = {
	default: async ({ request, locals, params }) => {
		requireAuth(locals);

		const data = await request.formData();
		const title = data.get('title');
		const slug = data.get('slug');
		const content = data.get('content');
		const groupId = data.get('groupId') || null;

		if (!title || !slug || !content) {
			return fail(400, { error: 'Пожалуйста, заполните необходимые поля', title, slug, groupId });
		}

		// Проверяем, не занят ли slug другой статьей
		const existing = await prisma.article.findFirst({
			where: { 
				slug: slug.toString(),
				NOT: { id: params.id }
			}
		});

		if (existing) {
			return fail(400, { error: 'Статья с таким URL уже существует', title, slug, groupId });
		}

		try {
			await prisma.article.update({
				where: { id: params.id },
				data: {
					title: title.toString(),
					slug: slug.toString(),
					content: content.toString(),
					groupId: groupId ? groupId.toString() : null,
				}
			});
		} catch (e) {
			console.error(e);
			return fail(500, { error: 'Ошибка при сохранении статьи' });
		}

		throw redirect(303, '/admin');
	}
};
