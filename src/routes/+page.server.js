import { redirect } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function load() {
	// Try to find a 'home' or 'index' article
	const home = await prisma.article.findFirst({
		where: {
			OR: [
				{ slug: 'home' },
				{ slug: 'index' },
				{ slug: 'welcome' }
			],
			published: true
		}
	});

	if (home) {
		throw redirect(307, `/${home.slug}`);
	}

	// Otherwise redirect to the first published article
	const first = await prisma.article.findFirst({
		where: { published: true },
		orderBy: [
			{ group: { order: 'asc' } },
			{ order: 'asc' }
		],
		include: { group: true }
	});

	if (first) {
		throw redirect(307, `/${first.slug}`);
	}

	// If no articles exist, just render a placeholder ( handled in +page.svelte )
	return {};
}
