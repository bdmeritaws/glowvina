import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET - Get single product by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: "asc" },
        },
        variants: {
          orderBy: { createdAt: "asc" },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        _count: {
          select: { reviews: true, orderItems: true },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      title,
      slug,
      description,
      shortDescription,
      price,
      oldPrice,
      discount,
      mrp,
      sku,
      stockQuantity,
      lowStockAlert,
      isInStock,
      skinType,
      concern,
      ingredient,
      howToUse,
      resultClaim,
      badges,
      thumbnail,
      videoUrl,
      beforeImage,
      afterImage,
      metaTitle,
      metaDescription,
      isActive,
      isFeatured,
      productType,
      categoryIds,
      images,
      variants,
    } = body;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: true,
        images: true,
        variants: true,
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it's already taken
    if (slug && slug !== existingProduct.slug) {
      const slugExists = await prisma.product.findUnique({
        where: { slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Product with this slug already exists" },
          { status: 400 }
        );
      }
    }

    // Check SKU uniqueness if being changed
    if (sku && sku !== existingProduct.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku },
      });
      if (skuExists) {
        return NextResponse.json(
          { error: "Product with this SKU already exists" },
          { status: 400 }
        );
      }
    }

    // Update product
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        title: title || existingProduct.title,
        slug: slug || existingProduct.slug,
        description: description !== undefined ? description : existingProduct.description,
        shortDescription: shortDescription !== undefined ? shortDescription : existingProduct.shortDescription,
        price: price || existingProduct.price,
        oldPrice: oldPrice !== undefined ? oldPrice : existingProduct.oldPrice,
        discount: discount !== undefined ? discount : existingProduct.discount,
        mrp: mrp !== undefined ? mrp : existingProduct.mrp,
        sku: sku !== undefined ? sku : existingProduct.sku,
        stockQuantity: stockQuantity !== undefined ? stockQuantity : existingProduct.stockQuantity,
        lowStockAlert: lowStockAlert !== undefined ? lowStockAlert : existingProduct.lowStockAlert,
        isInStock: isInStock !== undefined ? isInStock : existingProduct.isInStock,
        skinType: skinType !== undefined ? skinType : existingProduct.skinType,
        concern: concern !== undefined ? concern : existingProduct.concern,
        ingredient: ingredient !== undefined ? ingredient : existingProduct.ingredient,
        howToUse: howToUse !== undefined ? howToUse : existingProduct.howToUse,
        resultClaim: resultClaim !== undefined ? resultClaim : existingProduct.resultClaim,
        badges: badges ? JSON.stringify(badges) : existingProduct.badges,
        thumbnail: thumbnail !== undefined ? thumbnail : existingProduct.thumbnail,
        videoUrl: videoUrl !== undefined ? videoUrl : existingProduct.videoUrl,
        beforeImage: beforeImage !== undefined ? beforeImage : existingProduct.beforeImage,
        afterImage: afterImage !== undefined ? afterImage : existingProduct.afterImage,
        metaTitle: metaTitle !== undefined ? metaTitle : existingProduct.metaTitle,
        metaDescription: metaDescription !== undefined ? metaDescription : existingProduct.metaDescription,
        isActive: isActive !== undefined ? isActive : existingProduct.isActive,
        isFeatured: isFeatured !== undefined ? isFeatured : existingProduct.isFeatured,
        productType: productType || existingProduct.productType,
      },
    });

    // Update categories if provided
    if (categoryIds !== undefined) {
      // Remove existing categories
      await prisma.productCategory.deleteMany({
        where: { productId: parseInt(id) },
      });

      // Add new categories
      if (categoryIds.length > 0) {
        await prisma.productCategory.createMany({
          data: categoryIds.map((categoryId) => ({
            productId: parseInt(id),
            categoryId,
          })),
        });
      }
    }

    // Update images if provided
    if (images !== undefined) {
      // Remove existing images
      await prisma.productImage.deleteMany({
        where: { productId: parseInt(id) },
      });

      // Add new images
      if (images.length > 0) {
        await prisma.productImage.createMany({
          data: images.map((img, index) => ({
            productId: parseInt(id),
            url: img.url,
            altText: img.altText,
            sortOrder: img.sortOrder ?? index,
            isPrimary: img.isPrimary || index === 0,
          })),
        });
      }
    }

    // Update variants if provided
    if (variants !== undefined) {
      // Remove existing variants
      await prisma.productVariant.deleteMany({
        where: { productId: parseInt(id) },
      });

      // Add new variants
      if (variants.length > 0) {
        await prisma.productVariant.createMany({
          data: variants.map((variant) => ({
            productId: parseInt(id),
            name: variant.name,
            sku: variant.sku,
            price: variant.price,
            oldPrice: variant.oldPrice,
            discount: variant.discount,
            stockQuantity: variant.stockQuantity || 0,
            image: variant.image,
            isActive: variant.isActive !== undefined ? variant.isActive : true,
          })),
        });
      }
    }

    // Fetch updated product with relations
    const updatedProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
        images: {
          orderBy: { sortOrder: "asc" },
        },
        variants: true,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { orderItems: true, cartItems: true, wishlistItems: true },
        },
      },
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if product has orders
    if (existingProduct._count.orderItems > 0) {
      return NextResponse.json(
        { error: "Cannot delete product with existing orders. Consider deactivating it instead." },
        { status: 400 }
      );
    }

    // Delete product (cascades to images, variants, categories, reviews)
    await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
