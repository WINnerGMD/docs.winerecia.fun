import { redirect } from '@sveltejs/kit';
import { getUser } from '$lib/server/auth';

/** @type {import('./$types').LayoutServerLoad} */
export const load = async ({ cookies, url }) => {
	const sessionId = cookies.get('session');

	if (!sessionId && url.pathname !== '/admin/login') {
		throw redirect(303, '/admin/login');
	}

  if (sessionId) {
    const user = await getUser(sessionId);
    if (!user && url.pathname !== '/admin/login') {
      // Invalid session
      throw redirect(303, '/admin/login');
    }
    return {
      user: { username: user.username }
    };
  }
};
