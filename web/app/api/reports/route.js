import { NextResponse } from 'next/server';

import { appendRecord, readStore } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ ok: true, data: readStore().reports });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const record = appendRecord('reports', {
    name: body.name || null,
    message: body.message || '',
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ ok: true, data: record }, { status: 201 });
}
