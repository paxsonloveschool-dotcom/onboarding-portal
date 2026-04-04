import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const documents = db
    .prepare('SELECT id, file_name, doc_type, uploaded_at FROM documents WHERE user_id = ? ORDER BY uploaded_at DESC')
    .all(userId);

  return NextResponse.json({ documents });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;

  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  const docType = formData.get('doc_type') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const userDir = path.join(process.cwd(), 'uploads', String(userId));
  await mkdir(userDir, { recursive: true });

  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
  const fileName = `${timestamp}_${safeName}`;
  const filePath = path.join(userDir, fileName);

  await writeFile(filePath, buffer);

  db.prepare(
    'INSERT INTO documents (user_id, file_name, file_path, doc_type) VALUES (?, ?, ?, ?)'
  ).run(userId, file.name, filePath, docType || 'other');

  return NextResponse.json({ success: true });
}
