import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

// Get upload directory from environment
function getUploadDir() {
  const isProduction = process.env.NODE_ENV === "production";
  
  // For production, use external directory (outside public folder)
  if (isProduction && process.env.PROD_UPLOAD_DIR) {
    return process.env.PROD_UPLOAD_DIR;
  }
  
  // For development, use public/cdn folder
  const uploadDir = process.env.UPLOAD_DIR || "public/cdn";
  return path.join(process.cwd(), uploadDir);
}

// Allowed file types
const ALLOWED_TYPES = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "products"; // products, categories, banners

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const fileType = file.type;
    if (!ALLOWED_TYPES[fileType]) {
      return NextResponse.json(
        { error: "Invalid file type. Allowed: jpg, jpeg, png, webp, gif" },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size: 5MB" },
        { status: 400 }
      );
    }

    // Get upload directory
    const uploadDir = getUploadDir();
    const targetDir = path.join(uploadDir, folder);

    // Create directory if not exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Generate unique filename
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const extension = ALLOWED_TYPES[fileType];
    const uniqueName = `${originalName}-${uuidv4().slice(0, 8)}.${extension}`;
    const filePath = path.join(targetDir, uniqueName);

    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Return the relative path (for CDN)
    const relativePath = `${folder}/${uniqueName}`;

    return NextResponse.json({
      success: true,
      path: relativePath,
      url: `/cdn/${relativePath}`,
      filename: uniqueName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}

// DELETE - Delete an image
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get("path");

    if (!imagePath) {
      return NextResponse.json(
        { error: "Image path required" },
        { status: 400 }
      );
    }

    const uploadDir = getUploadDir();
    const fullPath = path.join(uploadDir, imagePath);

    // Security check - prevent directory traversal
    if (!fullPath.startsWith(uploadDir)) {
      return NextResponse.json(
        { error: "Invalid path" },
        { status: 400 }
      );
    }

    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "File not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
