import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt"
export { default } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const { pathname } = req.nextUrl;

    if (token?.role !== "admin" && pathname.startsWith("/admin")) {
        const url = new URL("/log-in", req.nextUrl.origin);
        return NextResponse.redirect(url.toString());
    }

    return NextResponse.next();
}