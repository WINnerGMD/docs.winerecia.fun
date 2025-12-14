import { json } from '@sveltejs/kit';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST({ request }) {
	const data = await request.formData();
	const file = data.get('image');

	if (!file || !(file instanceof File)) {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	// 1. Validate File Type
	if (!file.type.startsWith('image/')) {
		return json({ error: 'Only images are allowed' }, { status: 400 });
	}

	// 2. Validate File Size (5MB limit)
	const MAX_SIZE = 5 * 1024 * 1024;
	if (file.size > MAX_SIZE) {
		return json({ error: 'File size exceeds 5MB limit' }, { status: 413 });
	}

	const buffer = await file.arrayBuffer();
	const hash = crypto.createHash('md5').update(Buffer.from(buffer)).digest('hex');
	const ext = file.name.split('.').pop();
	const filename = `${hash}.${ext}`;
	
	// Robust path handling for Dev vs Prod
	// In Prod (adapter-node), cwd is /app, static assets are in /app/build/client
	// In Dev, cwd is project root, static assets are in /static
	const isProd = process.env.NODE_ENV === 'production';
	const uploadDir = isProd 
		? join(process.cwd(), 'build', 'client', 'uploads')
		: join(process.cwd(), 'static', 'uploads');
	
	const path = join(uploadDir, filename);

	// Ensure directory exists
	// Note: In Docker, the volume mount might create 'uploads', 
	// but 'static/uploads' might not exist in clean dev env.
	// Since we use fs/promises, we need mkdir.
	// We need to import mkdir.
	// Wait, I can't import mkdir easily inside function if not updated top imports.
	// I will check imports first. filesystem promises has mkdir.
	
	await writeFile(path, Buffer.from(buffer));

	return json({ url: `/uploads/${filename}` });
}
