import { NextRequest, NextResponse } from 'next/server';
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
    .all(userId, team);

  return NextResponse.json({
    items: items.map((i: any) => ({ ...i, completed: !!i.completed })),
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { checklist_item_id, completed } = await req.json();

  if (completed) {
    db.prepare(
      `INSERT INTO checklist_progress (user_id, checklist_item_id, completed, completed_at)
       VALUES (?, ?, 1, datetime('now'))
       ON CONFLICT(user_id, checklist_item_id)
       DO UPDATE SET completed = 1, completed_at = datetime('now')`
    ).run(userId, checklist_item_id);
  } else {
    db.prepare(
      `INSERT INTO checklist_progress (user_id, checklist_item_id, completed, completed_at)
       VALUES (?, ?, 0, NULL)
       ON CONFLICT(user_id, checklist_item_id)
       DO UPDATE SET completed = 0, completed_at = NULL`
    ).run(userId, checklist_item_id);
  }

  return NextResponse.json({ success: true });
}
