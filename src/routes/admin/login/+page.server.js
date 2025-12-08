import { fail, redirect } from '@sveltejs/kit';
import { verifyUser, createSession } from '$lib/server/auth';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const username = data.get('username');
		const password = data.get('password');

		if (!username || !password) {
			return fail(400, { error: 'Пожалуйста, заполните все поля' });
		}


		const user = await verifyUser(username.toString(), password.toString());

		if (!user) {
			return fail(401, { error: 'Неверное имя пользователя или пароль' });
		}

		const { sessionId, expiresAt } = await createSession(user.id);

		cookies.set('session', sessionId, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: process.env.NODE_ENV === 'production',
			expires: expiresAt
		});

		throw redirect(303, '/admin');
	}
};
