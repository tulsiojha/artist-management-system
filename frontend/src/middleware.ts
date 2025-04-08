import { NextRequest, NextResponse } from "next/server";

/* roles per page */
const pages: Record<string, string[]> = {
  "/dashboard/users/": ["super_admin"],
  "/dashboard/artists/": ["super_admin", "artist_manager"],
  "/dashboard/songs/": ["artist"],
};

/* redirect urls for specific role */
const redirects: Record<string, string> = {
  super_admin: "/dashboard/users/",
  artist_manager: "/dashboard/artists/",
  artist: "/dashboard/songs/",
  dashboard: "/dashboard/users/",
};

/* get role from cookie */
const getRole = (req: NextRequest) => {
  return req.cookies.get("role")?.value;
};

/* match path from pages */
const matchPath = (pathname: string): string | undefined =>
  Object.keys(pages).find((path) => pathname.startsWith(path));

const ensureRole = async (req: NextRequest) => {
  const { url, nextUrl } = req;
  const { pathname } = nextUrl;

  const role = getRole(req);

  if (!role) {
    const response = NextResponse.redirect(new URL("/auth/login", url));
    response.cookies.delete("accessToken");
    return response;
  }

  if (pathname === "/dashboard" || pathname === "/dashboard/") {
    return NextResponse.redirect(new URL(redirects[role], url));
  }

  const matchedPath = matchPath(pathname);
  if (matchedPath) {
    const allowedRoles = pages[matchedPath];
    const hasRole = allowedRoles.includes(role);
    if (!hasRole) {
      return NextResponse.redirect(new URL(redirects[role], url));
    }
  }
  return NextResponse.next();
};

export function middleware(req: NextRequest) {
  return ensureRole(req);
}

export const config = {
  matcher: ["/dashboard/:path*"], // Applies to all sub-routes under /dashboard
};
