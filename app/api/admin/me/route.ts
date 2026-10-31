import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  let session = null;
  try {
    session = await verifySession(token);
  } catch {
    // Secret not set: nobody is an admin.
  }
  return NextResponse.json({ isAdmin: Boolean(session), user: session?.user ?? null });
}
