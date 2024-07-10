import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();

    // Handle /docs and /docs/
    if (url.pathname === '/docs' || url.pathname === '/docs/') {
        url.pathname = '/docs/index.html';
        return NextResponse.rewrite(url);
    }

    // Remove .html extension
    if (url.pathname.startsWith('/docs/') && url.pathname.endsWith('.html')) {
        url.pathname = url.pathname.replace(/\.html$/, '');
        return NextResponse.redirect(url);
    }

    // Serve .html files for clean URLs under /docs/
    if (url.pathname.startsWith('/docs/') && !url.pathname.endsWith('.html')) {
        url.pathname = `${url.pathname}.html`;
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/docs/:path*',
};