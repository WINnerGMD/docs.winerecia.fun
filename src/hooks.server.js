// Защита от кривого импорта (хотя db.js экспортирует prisma нормально)
import { prisma } from '$lib/server/db';
import { validateSession } from '$lib/server/auth';
import { sequence } from '@sveltejs/kit/hooks';

// Rate Limiting Map
const loginAttempts = new Map();

/** @type {import('@sveltejs/kit').Handle} */
async function rateLimit({ event, resolve }) {
    if (event.url.pathname === '/admin/login' && event.request.method === 'POST') {
        const ip = event.getClientAddress();
        const now = Date.now();
        const windowMs = 15 * 60 * 1000; // 15 минут
        
        const record = loginAttempts.get(ip) || { count: 0, start: now };
        
        // Сброс окна, если время вышло
        if (now - record.start > windowMs) {
            record.count = 0;
            record.start = now;
        }

        if (record.count >= 5) {
            return new Response('Too many login attempts. Please try again later.', { 
                status: 429,
                headers: { 'Retry-After': '900' }
            });
        }

        record.count++;
        loginAttempts.set(ip, record);
    }
    return resolve(event);
}

/** @type {import('@sveltejs/kit').Handle} */
export async function securityHeaders({ event, resolve }) {
	const response = await resolve(event);
	
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	// Basic Permissions Policy
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	return response;
}

/** @type {import('@sveltejs/kit').Handle} */
async function auth({ event, resolve }) {
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

export const handle = sequence(securityHeaders, rateLimit, auth);
