import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const employeeId = parseInt(id, 10);

  if (isNaN(employeeId)) {
    return NextResponse.json({ error: 'Invalid employee ID' }, { status: 400 });
  }

  // Don't allow deleting admin accounts
  const user = db.prepare('SELECT role FROM users WHERE id = ?').get(employeeId) as any;
  if (!user) {
    return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
  }
  if (user.role === 'admin') {
    return NextResponse.json({ error: 'Cannot delete admin accounts' }, { status: 403 });
  }

  // Delete all related data in a transaction
  const deleteEmployee = db.transaction(() => {
    db.prepare('DELETE FROM checklist_progress WHERE user_id = ?').run(employeeId);
    db.prepare('DELETE FROM documents WHERE user_id = ?').run(employeeId);
    db.prepare('DELETE FROM w9_submissions WHERE user_id = ?').run(employeeId);
    db.prepare('DELETE FROM users WHERE id = ?').run(employeeId);
  });

  deleteEmployee();

  return NextResponse.json({ success: true });
}
