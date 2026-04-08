import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET - List all banners
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');
    const activeOnly = searchParams.get('active');

    const where = {};
    
    if (position) {
      where.position = position;
    }
    
    if (activeOnly === 'true') {
      where.isActive = true;
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: { sortOrder: "asc" },
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

// POST - Create new banner
export async function POST(request) {
  try {
    const body = await request.json();
    const { 
      title, 
      subtitle, 
      image, 
      mobileImage, 
      link, 
      linkText, 
      position, 
      isActive, 
      sortOrder, 
      startsAt, 
      expiresAt 
    } = body;

    // Validate required fields
    if (!image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    const banner = await prisma.banner.create({
      data: {
        title,
        subtitle,
        image,
        mobileImage,
        link,
        linkText,
        position: position || "HERO",
        isActive: isActive !== undefined ? isActive : true,
        sortOrder: sortOrder || 0,
        startsAt: startsAt ? new Date(startsAt) : null,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json(banner, { status: 201 });
  } catch (error) {
    console.error("Error creating banner:", error);
    return NextResponse.json(
      { error: "Failed to create banner" },
      { status: 500 }
    );
  }
}
