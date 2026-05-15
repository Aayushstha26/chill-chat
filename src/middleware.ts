import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl

  // logged in user trying to visit auth pages
  if (
    token &&
    (url.pathname.startsWith("/authPage"))
  ) {
    return NextResponse.redirect(new URL("/Dashboard/chat", request.url))
  }

  // not logged in user trying to visit protected pages
  if (!token && url.pathname.startsWith("Dashboard/chat")) {
    return NextResponse.redirect(new URL("/authPage", request.url))
  }
}

export const config = {
  matcher: ["/authPage", "/Dashboard/chat/:path*"],
}