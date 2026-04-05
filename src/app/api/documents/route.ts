import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const ALLOWED_EXTENSIONS = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];

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

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: 'File too large. Maximum size is 10MB.' },
      { status: 400 }
    );
  }

  // Validate file extension
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: `Invalid file type. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` },
      { status: 400 }
    );
  }

  // Validate MIME type
  if (file.type && !ALLOWED_MIME_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: 'Invalid file type. Please upload PDF, image, or Word documents.' },
      { status: 400 }
    );
  }

  // Validate doc_type
  const validDocTypes = ['government_id', 'drivers_license', 'certification', 'insurance', 'other'];
  if (docType && !validDocTypes.includes(docType)) {
    return NextResponse.json({ error: 'Invalid document type' }, { status: 400 });
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
