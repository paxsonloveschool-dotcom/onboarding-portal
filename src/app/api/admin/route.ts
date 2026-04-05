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

  // Recent activity: last 20 actions across W9 submissions, document uploads, checklist completions
  const activities = db
    .prepare(
      `SELECT * FROM (
        SELECT w.id, u.name as employee_name, u.team, 'Submitted W-9 form' as action, w.submitted_at as timestamp
        FROM w9_submissions w JOIN users u ON w.user_id = u.id
        UNION ALL
        SELECT d.id, u.name as employee_name, u.team, 'Uploaded ' || d.doc_type || ' document' as action, d.uploaded_at as timestamp
        FROM documents d JOIN users u ON d.user_id = u.id
        UNION ALL
        SELECT cp.id, u.name as employee_name, u.team, 'Completed: ' || ci.title as action, cp.completed_at as timestamp
        FROM checklist_progress cp
        JOIN users u ON cp.user_id = u.id
        JOIN checklist_items ci ON cp.checklist_item_id = ci.id
        WHERE cp.completed = 1 AND cp.completed_at IS NOT NULL
      ) ORDER BY timestamp DESC LIMIT 20`
    )
    .all();

  return NextResponse.json({ employees, activities });
}
