import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  let prismaClient = null;
  
  try {
    // Ensure prisma is initialized
    prismaClient = prisma;
    
    // Test database connection first
    await prismaClient.$connect();
    
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find admin user by email OR firstName (username)
    const admin = await prismaClient.user.findFirst({
      where: {
        OR: [
          { email: email },
          { firstName: email } // Allow login with username (firstName)
        ]
      },
    });

    // If admin doesn't exist, return error (no auto-registration)
    if (!admin) {
      return NextResponse.json(
        { message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    // Check if user is an admin
    if (admin.role !== "ADMIN" && admin.role !== "SUPER_ADMIN") {
      return NextResponse.json(
        { message: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email/username or password" },
        { status: 401 }
      );
    }

    // Check if account is active
    if (!admin.isActive) {
      return NextResponse.json(
        { message: "Your account has been deactivated" },
        { status: 403 }
      );
    }

    // Create response with user data
    const response = NextResponse.json(
      {
        message: "Login successful",
        admin: {
          id: admin.id,
          email: admin.email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
        },
      },
      { status: 200 }
    );

    // Set session cookie
    const sessionData = Buffer.from(JSON.stringify({
      id: admin.id,
      email: admin.email,
      role: admin.role,
    })).toString("base64");

    response.cookies.set("admin_token", sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    
    // Check if it's a database connection error
    if (error.message && error.message.includes('prisma')) {
      return NextResponse.json(
        { message: "Database connection error. Please try again later." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { message: "Login failed. Please try again." },
      { status: 500 }
    );
  } finally {
    // Disconnect to prevent connection pool exhaustion
    if (prismaClient) {
      await prismaClient.$disconnect().catch(() => {});
    }
  }
}
