import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

// GET - Get single category by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        parent: true,
        children: true,
        _count: {
          select: { products: true },
        },
      },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// PUT - Update category
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, slug, description, image, parentId, sortOrder, isActive } = body;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if slug is being changed and if it's already taken
    if (slug && slug !== existingCategory.slug) {
      const slugExists = await prisma.category.findUnique({
        where: { slug },
      });
      if (slugExists) {
        return NextResponse.json(
          { error: "Category with this slug already exists" },
          { status: 400 }
        );
      }
    }

    const category = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name: name || existingCategory.name,
        slug: slug || existingCategory.slug,
        description: description !== undefined ? description : existingCategory.description,
        image: image !== undefined ? image : existingCategory.image,
        parentId: parentId !== undefined ? (parentId || null) : existingCategory.parentId,
        sortOrder: sortOrder !== undefined ? sortOrder : existingCategory.sortOrder,
        isActive: isActive !== undefined ? isActive : existingCategory.isActive,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    );
  }
}

// DELETE - Delete category
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: {
        _count: {
          select: { products: true, children: true },
        },
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with products. Remove products first." },
        { status: 400 }
      );
    }

    // Check if category has children
    if (existingCategory._count.children > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with subcategories. Remove subcategories first." },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
