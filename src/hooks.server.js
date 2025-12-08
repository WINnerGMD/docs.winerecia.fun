// Защита от кривого импорта (хотя db.js экспортирует prisma нормально)
import { prisma } from '$lib/server/db';
import { validateSession } from '$lib/server/auth';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	const sessionId = event.cookies.get('session');

	if (sessionId) {
		const result = await validateSession(sessionId);
		if (result) {
			event.locals.user = {
				id: result.user.id,
				username: result.user.username
			};
			event.locals.session = result.session;
		} else {
			// Всё, сессия сдохла или паленая
			event.cookies.delete('session', { path: '/' });
		}
	}

	return resolve(event);
}
