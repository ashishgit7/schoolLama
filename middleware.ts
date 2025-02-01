import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY || "";

export async function middleware(request: NextRequest) {
  // Your middleware logic here
  const response = NextResponse.next();

  response.headers.set("Access-Control-Allow-Origin", "*"); // Change '*' to a specific domain if needed
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

  try {
    if (request.nextUrl.pathname.startsWith("/api/auth/user")) {
      return NextResponse.next();
    }
    const token: string = request.cookies.get("token")?.value || "";
    const key = new TextEncoder().encode(secretKey);
    const decodedToken = await jwtVerify(token, key);
    if (!decodedToken) {
      return new NextResponse(
        JSON.stringify({ message: "403 required authentication" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const response = NextResponse.next();
    return response;
  } catch (error) {
    console.error("Error in middleware:", error);
    return new NextResponse(
      JSON.stringify({ message: "500 internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// Optional: Configure on which paths to run the middleware
export const config = {
  matcher: [
    "/api/:path*",
  ],
};
