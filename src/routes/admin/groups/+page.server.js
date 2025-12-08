import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { requireAuth } from '$lib/server/auth';

export const load = async ({ locals }) => {
	requireAuth(locals);
	
	const groups = await prisma.group.findMany({
		orderBy: { order: 'asc' },
		include: { _count: { select: { articles: true } } }
	});

	return { groups };
};

export const actions = {
	create: async ({ request, locals }) => {
		requireAuth(locals);
		const data = await request.formData();
		const name = data.get('name');
		const slug = data.get('slug');
		const icon = data.get('icon') || 'Folder'; // По дефолту папка
		const order = Number(data.get('order')) || 0;

		if (!name || !slug) {
			return fail(400, { error: 'Заполните название и slug' });
		}

		try {
			await prisma.group.create({
				data: { name: name.toString(), slug: slug.toString(), order, icon: icon.toString() }
			});
		} catch (e) {
			return fail(400, { error: 'Ошибка создания (возможно slug занят)' });
		}
	},
	delete: async ({ request, locals }) => {
		requireAuth(locals);
		const data = await request.formData();
		const id = data.get('id');

		if (!id) return fail(400, { error: 'No ID' });

		try {
			await prisma.group.delete({ where: { id: id.toString() } });
		} catch (e) {
			return fail(500, { error: 'Нельзя удалить группу, в которой есть статьи' });
		}
	},
	update: async ({ request, locals }) => {
		requireAuth(locals);
		const data = await request.formData();
		const id = data.get('id');
		const name = data.get('name');
		const slug = data.get('slug');
		const icon = data.get('icon') || 'Folder';
		const order = Number(data.get('order')) || 0;

		if (!id || !name || !slug) {
			return fail(400, { error: 'Заполните все поля' });
		}

		try {
			await prisma.group.update({
				where: { id: id.toString() },
				data: { name: name.toString(), slug: slug.toString(), order, icon: icon.toString() }
			});
		} catch (e) {
			console.error('Update Error:', e);
			return fail(400, { error: 'Ошибка обновления: ' + e.message });
		}
	}
};
