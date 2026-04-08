import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - List all public banners (active hero banners)
export async function GET(request) {
  try {
    const now = new Date();
    
    const banners = await prisma.banner.findMany({
      where: {
        isActive: true,
        position: 'HERO',
        OR: [
          { startsAt: null, expiresAt: null },
          { startsAt: { lte: now }, expiresAt: null },
          { startsAt: null, expiresAt: { gte: now } },
          { startsAt: { lte: now }, expiresAt: { gte: now } },
        ],
      },
      orderBy: { sortOrder: "asc" },
      select: {
        id: true,
        title: true,
        subtitle: true,
        image: true,
        mobileImage: true,
        link: true,
        linkText: true,
        sortOrder: true,
      },
    });

    return NextResponse.json(banners);
  } catch (error) {
    console.error("Error fetching banners:", error);
    return NextResponse.json(
      { error: "Failed to fetch banners" },
      { status: 500 }
    );
  }
}
