import { NextResponse } from 'next/server';

import { appendRecord, readStore } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ ok: true, data: readStore().devices });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const record = appendRecord('devices', {
    name: body.name || null,
    userAgent: body.userAgent || request.headers.get('user-agent'),
    meta: body.meta || {},
  });

  return NextResponse.json({ ok: true, data: record }, { status: 201 });
}
