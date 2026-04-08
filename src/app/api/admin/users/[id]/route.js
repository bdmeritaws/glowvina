import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET - Get single user by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        avatar: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { orders: true, addresses: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

// PUT - Update user
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { email, firstName, lastName, phone, role, isActive, password } = body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== existingUser.email) {
      const emailExists = await prisma.user.findUnique({
        where: { email },
      });
      if (emailExists) {
        return NextResponse.json(
          { error: "User with this email already exists" },
          { status: 400 }
        );
      }
    }

    // Prepare update data
    const updateData = {
      email: email || existingUser.email,
      firstName: firstName !== undefined ? firstName : existingUser.firstName,
      lastName: lastName !== undefined ? lastName : existingUser.lastName,
      phone: phone !== undefined ? phone : existingUser.phone,
      role: role || existingUser.role,
      isActive: isActive !== undefined ? isActive : existingUser.isActive,
    };

    // If password is being updated, hash it
    if (password) {
      const bcrypt = require('bcryptjs');
      updateData.password = await bcrypt.hash(password, 10);
    }

    const user = await prisma.user.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

// DELETE - Delete user
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { orders: true, addresses: true, reviews: true },
        },
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user has orders
    if (existingUser._count.orders > 0) {
      // Instead of preventing deletion, we can deactivate the user
      await prisma.user.update({
        where: { id: parseInt(id) },
        data: { isActive: false },
      });
      return NextResponse.json({ message: "User deactivated (has existing orders)" });
    }

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
