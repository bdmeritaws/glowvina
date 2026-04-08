import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - List all public categories (only top-level categories with isActive=true)
export async function GET(request) {
  try {
    const categories = await prisma.category.findMany({
      where: {
        isActive: true,
        parentId: null, // Only get top-level categories
      },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        name: true,
        slug: true,
        description: true,
        image: true,
        sortOrder: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
