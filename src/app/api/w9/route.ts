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
  const submission = db
    .prepare('SELECT id, name, business_name, federal_tax_classification, address, city_state_zip, signature, date_signed, submitted_at FROM w9_submissions WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1')
    .get(userId);

  return NextResponse.json({ submission: submission || null });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const body = await req.json();

  const { name, business_name, federal_tax_classification, address, city_state_zip, ssn_or_ein, signature, date_signed } = body;

  if (!name || !address || !city_state_zip || !ssn_or_ein || !signature) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  db.prepare(
    `INSERT INTO w9_submissions (user_id, name, business_name, federal_tax_classification, address, city_state_zip, ssn_or_ein, signature, date_signed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(userId, name, business_name || '', federal_tax_classification || 'individual', address, city_state_zip, ssn_or_ein, signature, date_signed);

  return NextResponse.json({ success: true });
}
