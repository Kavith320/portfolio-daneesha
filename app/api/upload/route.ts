import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary only if environment variables are present
const isCloudinaryConfigured = 
  !!process.env.CLOUDINARY_CLOUD_NAME && 
  !!process.env.CLOUDINARY_API_KEY && 
  !!process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file was uploaded." },
        { status: 400 }
      );
    }

    // Convert file object into Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (!isCloudinaryConfigured) {
      return NextResponse.json(
        { error: "Upload failed: Cloudinary configuration is missing from environment variables." },
        { status: 500 }
      );
    }

    // Upload directly to Cloudinary using Base64 URI
    const base64Data = buffer.toString("base64");
    const fileUri = `data:${file.type};base64,${base64Data}`;

    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      resource_type: "auto", // Auto-detects image vs video vs raw files
      folder: "portfolio_assets",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      name: file.name
    });
  } catch (error: any) {
    console.error("Upload handler failed:", error);
    return NextResponse.json(
      { error: "Upload failed: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
}
