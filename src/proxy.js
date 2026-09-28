import { NextResponse } from "next/server";

const GEO_COOKIE = "aisc_geo";

export default function proxy(request) {
  // Already detected on a previous request. Leave the response
  // untouched so static HTML stays cacheable.
  if (request.cookies.has(GEO_COOKIE)) {
    return NextResponse.next();
  }

  // Vercel sets this on every deployment. Empty locally and on
  // non-Vercel hosts, in which case the client falls back to timezone.
  const country = request.headers.get("x-vercel-ip-country");
  // No geo header: set nothing. Writing a USD cookie here would stop the
  // client's timezone fallback from ever running (it trusts the cookie),
  // so every visitor without the header saw dollars.
  if (!country) {
    return NextResponse.next();
  }
  const currency = country === "NG" ? "NGN" : "USD";

  const response = NextResponse.next();
  response.cookies.set(GEO_COOKIE, currency, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: "lax",
  });
  return response;
}

export const config = {
  // Run on pages only. Skip API routes, Next internals, and static files.
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};