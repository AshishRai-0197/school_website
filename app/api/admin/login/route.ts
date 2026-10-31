import { NextResponse } from "next/server";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSession, safeEqual } from "@/lib/auth";

export async function POST(request: Request) {
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminUser || !adminPassword || !process.env.ADMIN_SESSION_SECRET) {
    console.error("Admin login is not set up. Add ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET to .env");
    return NextResponse.json({ message: "Admin login is not set up" }, { status: 500 });
  }

  let username = "";
  let password = "";
  try {
    const body = await request.json();
    username = String(body.username ?? "");
    password = String(body.password ?? "");
  } catch {
    return NextResponse.json({ message: "Invalid request" }, { status: 400 });
  }

  const userOk = await safeEqual(username, adminUser);
  const passOk = await safeEqual(password, adminPassword);
  if (!userOk || !passOk) {
    return NextResponse.json({ message: "Wrong username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ message: "Logged in" });
  response.cookies.set(SESSION_COOKIE, await createSession(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}
