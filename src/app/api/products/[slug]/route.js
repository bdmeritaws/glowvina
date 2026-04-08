import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Get single product by slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const product = await prisma.product.findUnique({
      where: { 
        slug,
        isActive: true,
      },
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
              },
            },
          },
        },
        images: {
          orderBy: { sortOrder: "asc" },
        },
        variants: {
          where: { isActive: true },
          orderBy: { sortOrder: "asc" },
        },
        _count: {
          select: { reviews: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Transform product to match frontend format
    const transformedProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      description: product.description,
      shortDescription: product.shortDescription,
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      mrp: product.mrp,
      sku: product.sku,
      stock: product.stock,
      isFeatured: product.isFeatured,
      productType: product.productType,
      images: product.images.map(img => img.url),
      beforeImage: product.beforeImage,
      afterImage: product.afterImage,
      categories: product.categories.map(pc => pc.category),
      variants: product.variants,
      reviewsCount: product._count.reviews,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

    return NextResponse.json(transformedProduct);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
