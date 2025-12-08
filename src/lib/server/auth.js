import { redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import crypto from 'crypto';

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // Неделя жизни сессии

export async function hashPassword(password) {
  return await Bun.password.hash(password);
}

export async function verifyUser(username, password) {
  const user = await prisma.user.findUnique({
    where: { username }
  });

  if (!user) return null;

  const valid = await Bun.password.verify(password, user.password);
  if (!valid) return null;

  return user;
}

export async function createSession(userId) {
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_SECONDS * 1000);

  await prisma.session.create({
    data: {
      id: sessionId,
      userId,
      expiresAt
    }
  });

  return { sessionId, expiresAt };
}

export async function validateSession(sessionId) {
  const session = await prisma.session.findUnique({
    where: { id: sessionId },
    include: { user: true }
  });

  if (!session) return null;

  if (Date.now() > session.expiresAt.getTime()) {
    await prisma.session.delete({ where: { id: sessionId } });
    return null;
  }

  // Можно добавить продление сессии тут, если нужно

  return { session, user: session.user };
}

export async function invalidateSession(sessionId) {
  await prisma.session.delete({ where: { id: sessionId } }).catch(() => {});
}

export function requireAuth(locals) {
  if (!locals.user) {
    throw redirect(302, '/admin/login');
  }
}
