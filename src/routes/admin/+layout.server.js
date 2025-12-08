import { requireAuth } from '$lib/server/auth';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ locals, url }) => {
	if (url.pathname !== '/admin/login') {
		requireAuth(locals);
	}

	return {
		user: locals.user
	};
};
