import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    
    if (!cookieHeader) {
      return NextResponse.json(
        { message: "No cookies found" },
        { status: 401 }
      );
    }

    // Parse the cookie
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c) => {
        const [key, ...val] = c.trim().split("=");
        return [key, val.join("=")];
      })
    );

    const token = cookies.admin_token;

    if (!token) {
      return NextResponse.json(
        { message: "No token found" },
        { status: 401 }
      );
    }

    // Decode the base64 token
    const decoded = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));

    return NextResponse.json({
      success: true,
      admin: {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      },
    });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
