import { verifyJwt } from "./lib/jwt";
import { NextRequest, NextResponse } from "next/server";
export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value || req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
        console.log("No token found. Please login first")
        return NextResponse.redirect(new URL("/authPage", req.url));
    }

    try {

        const isVerified: any = await verifyJwt(token);

        if (!isVerified || !isVerified.id) {
            console.log("Unauthorized access")
            return NextResponse.json({ message: "Unauthorized access", success: false }, { status: 401 });
        }

        const response = NextResponse.next();
        console.log("user id:", isVerified)
        response.headers.set("x-user-id", isVerified.id.toString());
        return response;
    } catch (error) {
        console.error("Middleware error:", error);
        return NextResponse.redirect(new URL("/authPage", req.url));
    }
}
export const config = {
    matcher: ['/Dashboard/:path*']
}