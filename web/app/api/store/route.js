import { NextResponse } from 'next/server';

import { readStore } from '../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET() {
  return NextResponse.json({ ok: true, data: readStore() });
}
