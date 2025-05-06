import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { LocaleSupport } from "./enums";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const search = url.search;

  const SUPPORTED_LOCALES = [LocaleSupport.EN, LocaleSupport.VI];
  const DEFAULT_LOCALE = LocaleSupport.EN;

  // Check if the user accessed only the domain (e.g., example.com → redirect to /home)
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Extract locale from the URL (first segment)
  const pathSegments = pathname.split("/");
  const hasLocale = SUPPORTED_LOCALES.includes(
    pathSegments[1] as LocaleSupport,
  );

  if (!hasLocale) {
    // Get locale from cookies or use the default
    const cookies = request.cookies;
    const savedLocale = cookies.get("NEXT_LOCALE")?.value || DEFAULT_LOCALE;

    // Redirect to the same path but with locale prefix
    const newUrl = new URL(`/${savedLocale}${pathname}${search}`, request.url);
    const response = NextResponse.redirect(newUrl);
    return response;
  }

  // Continue to the requested page if everything is fine
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    `/`,
    `/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)`,
  ],
};
