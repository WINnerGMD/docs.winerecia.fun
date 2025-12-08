import { json } from '@sveltejs/kit';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST({ request }) {
	const data = await request.formData();
	const file = data.get('image');

	if (!file || !(file instanceof File)) {
		return json({ error: 'No file uploaded' }, { status: 400 });
	}

	const buffer = await file.arrayBuffer();
	const hash = crypto.createHash('md5').update(Buffer.from(buffer)).digest('hex');
	const ext = file.name.split('.').pop();
	const filename = `${hash}.${ext}`;
	
	// Ensure static/uploads exists (created by command, but good to be safe in real app)
	const path = join(process.cwd(), 'static', 'uploads', filename);
	
	await writeFile(path, Buffer.from(buffer));

	return json({ url: `/uploads/${filename}` });
}
