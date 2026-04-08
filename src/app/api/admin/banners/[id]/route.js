import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET - Get single banner by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const banner = await prisma.banner.findUnique({
      where: { id: parseInt(id) },
    });

    if (!banner) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(banner);
  } catch (error) {
    console.error("Error fetching banner:", error);
    return NextResponse.json(
      { error: "Failed to fetch banner" },
      { status: 500 }
    );
  }
}

// PUT - Update banner
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
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

    // Check if banner exists
    const existingBanner = await prisma.banner.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBanner) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    const banner = await prisma.banner.update({
      where: { id: parseInt(id) },
      data: {
        title: title !== undefined ? title : existingBanner.title,
        subtitle: subtitle !== undefined ? subtitle : existingBanner.subtitle,
        image: image !== undefined ? image : existingBanner.image,
        mobileImage: mobileImage !== undefined ? mobileImage : existingBanner.mobileImage,
        link: link !== undefined ? link : existingBanner.link,
        linkText: linkText !== undefined ? linkText : existingBanner.linkText,
        position: position !== undefined ? position : existingBanner.position,
        isActive: isActive !== undefined ? isActive : existingBanner.isActive,
        sortOrder: sortOrder !== undefined ? sortOrder : existingBanner.sortOrder,
        startsAt: startsAt !== undefined ? (startsAt ? new Date(startsAt) : null) : existingBanner.startsAt,
        expiresAt: expiresAt !== undefined ? (expiresAt ? new Date(expiresAt) : null) : existingBanner.expiresAt,
      },
    });

    return NextResponse.json(banner);
  } catch (error) {
    console.error("Error updating banner:", error);
    return NextResponse.json(
      { error: "Failed to update banner" },
      { status: 500 }
    );
  }
}

// DELETE - Delete banner
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if banner exists
    const existingBanner = await prisma.banner.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingBanner) {
      return NextResponse.json(
        { error: "Banner not found" },
        { status: 404 }
      );
    }

    await prisma.banner.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    return NextResponse.json(
      { error: "Failed to delete banner" },
      { status: 500 }
    );
  }
}
