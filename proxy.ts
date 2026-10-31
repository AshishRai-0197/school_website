import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

// Pages only an admin can open.
const ADMIN_PAGES = ["/curricular/add", "/curricular/edit"];
// APIs where only an admin may change data (reading stays public).
const ADMIN_WRITE_APIS = ["/api/curricular", "/api/update", "/api/delete"];
const WRITE_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = ADMIN_PAGES.some((p) => pathname.startsWith(p));
  const isAdminWrite =
    WRITE_METHODS.has(request.method) && ADMIN_WRITE_APIS.some((p) => pathname.startsWith(p));

  if (!isAdminPage && !isAdminWrite) return NextResponse.next();

  const session = await verifySession(request.cookies.get(SESSION_COOKIE)?.value);
  if (session) return NextResponse.next();

  if (isAdminWrite) {
    return NextResponse.json({ message: "Admin login required" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/curricular/add",
    "/curricular/edit/:path*",
    "/api/curricular/:path*",
    "/api/update/:path*",
    "/api/delete/:path*",
  ],
};
