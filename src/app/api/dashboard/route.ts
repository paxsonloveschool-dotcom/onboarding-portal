import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const team = (session.user as any).team;

  // Get checklist items with progress in one query
  const items = db
    .prepare(
      `SELECT ci.id, ci.title, ci.description, ci.order_num,
              COALESCE(cp.completed, 0) as completed,
              cp.completed_at
       FROM checklist_items ci
       LEFT JOIN checklist_progress cp ON ci.id = cp.checklist_item_id AND cp.user_id = ?
       WHERE ci.team = ?
       ORDER BY ci.order_num`
    )
    .all(userId, team) as any[];

  const completedCount = items.filter((i) => i.completed).length;

  // Get W9 status
  const w9 = db
    .prepare('SELECT id FROM w9_submissions WHERE user_id = ? LIMIT 1')
    .get(userId);

  // Get document count
  const docResult = db
    .prepare('SELECT COUNT(*) as count FROM documents WHERE user_id = ?')
    .get(userId) as { count: number };

  return NextResponse.json({
    checklist: {
      completed: completedCount,
      total: items.length,
    },
    hasW9: !!w9,
    docCount: docResult.count,
  });
}
