import { NextResponse } from 'next/server';

import { appendRecord, readStore } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ ok: true, data: readStore().events });
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const record = appendRecord('events', {
    type: body.type || 'nfc_open',
    name: body.name || null,
    url: body.url || null,
    appLink: body.appLink || null,
    userAgent: request.headers.get('user-agent'),
  });

  return NextResponse.json({ ok: true, data: record }, { status: 201 });
}
