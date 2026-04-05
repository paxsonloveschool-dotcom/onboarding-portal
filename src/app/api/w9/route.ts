import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/lib/db';
import { encrypt, maskSSN } from '@/lib/crypto';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const submission = db
    .prepare('SELECT id, name, business_name, federal_tax_classification, address, city_state_zip, ssn_or_ein, signature, date_signed, submitted_at FROM w9_submissions WHERE user_id = ? ORDER BY submitted_at DESC LIMIT 1')
    .get(userId) as any;

  if (submission) {
    // Mask the SSN/EIN for display - never return raw value
    submission.ssn_or_ein = maskSSN(submission.ssn_or_ein);
  }

  return NextResponse.json({ submission: submission || null });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as any).id;

  // Check if already submitted - prevent duplicates
  const existing = db
    .prepare('SELECT id FROM w9_submissions WHERE user_id = ?')
    .get(userId);

  if (existing) {
    return NextResponse.json(
      { error: 'W-9 already submitted. Contact admin to update.' },
      { status: 409 }
    );
  }

  const body = await req.json();

  const { name, business_name, federal_tax_classification, address, city_state_zip, ssn_or_ein, signature, date_signed } = body;

  if (!name || !address || !city_state_zip || !ssn_or_ein || !signature) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate SSN/EIN format
  const cleanedSSN = ssn_or_ein.replace(/[^0-9]/g, '');
  if (cleanedSSN.length !== 9) {
    return NextResponse.json({ error: 'SSN/EIN must be 9 digits' }, { status: 400 });
  }

  // Encrypt sensitive PII before storage
  const encryptedSSN = encrypt(ssn_or_ein);

  db.prepare(
    `INSERT INTO w9_submissions (user_id, name, business_name, federal_tax_classification, address, city_state_zip, ssn_or_ein, signature, date_signed)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(userId, name, business_name || '', federal_tax_classification || 'individual', address, city_state_zip, encryptedSSN, signature, date_signed);

  return NextResponse.json({ success: true });
}
