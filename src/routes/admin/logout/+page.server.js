```javascript
import { redirect } from '@sveltejs/kit';
import { invalidateSession } from '$lib/server/auth';

export const actions = {
	default: async ({ cookies, locals }) => {
		if (locals.session) {
			await invalidateSession(locals.session.id);
		}
		cookies.delete('session', { path: '/' });
		throw redirect(303, '/admin/login');
	}
};
```
