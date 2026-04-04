import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const employees = db
    .prepare(
      `SELECT u.id, u.name, u.email, u.team, u.role, u.created_at,
              (SELECT COUNT(*) FROM w9_submissions WHERE user_id = u.id) as w9_count,
              (SELECT COUNT(*) FROM documents WHERE user_id = u.id) as doc_count,
              (SELECT COUNT(*) FROM checklist_progress WHERE user_id = u.id AND completed = 1) as checklist_completed,
              (SELECT COUNT(*) FROM checklist_items WHERE team = u.team) as checklist_total
       FROM users u
       ORDER BY u.created_at DESC`
    )
    .all();

  return NextResponse.json({ employees });
}
