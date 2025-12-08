import { prisma } from '$lib/server/db';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async () => {
	// Fetch all articles grouped by category for the sidebar
	const groups = await prisma.group.findMany({
		include: {
			articles: {
				select: {
					id: true,
					title: true,
					slug: true
				}
			}
		},
		orderBy: {
			order: 'asc'
		}
	});

	// Also fetch orphan articles (without group)
	const orphanArticles = await prisma.article.findMany({
		where: {
			groupId: null,
			published: true
		},
		select: {
			id: true,
			title: true,
			slug: true
		}
	});

	// Append orphans as a pseudo-group at the end or beginning
	if (orphanArticles.length > 0) {
		groups.push({
			id: 'orphans',
			name: 'Разное',
			order: 999,
			articles: orphanArticles,
			isOrphan: true
		});
	}

	return {
		navigation: groups
	};
};
