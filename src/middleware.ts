import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
  '/:locale/create(.*)',
]);

const isAdminRoute = createRouteMatcher(['/:locale/admin(.*)']);

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const authResult = await auth();

  if (
    isAdminRoute(req) &&
    authResult.sessionClaims?.metadata?.role !== 'admin'
  ) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/',
    '/(de|en)/:path*',
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
