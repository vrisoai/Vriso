import { NextRequest, NextResponse } from 'next/server';

const CANONICAL_HOST = 'invisigent.ai';
const ALIAS_HOSTS = new Set(['invisigent.com', 'www.invisigent.com', 'invisigent.in', 'www.invisigent.in', 'www.invisigent.ai']);

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const bare = host.replace(/:\d+$/, ''); // strip port

  if (ALIAS_HOSTS.has(bare)) {
    const url = req.nextUrl.clone();
    url.protocol = 'https:';
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next|favicon.ico).*)',
};
