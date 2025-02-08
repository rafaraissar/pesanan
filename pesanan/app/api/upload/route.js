import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary"; // Pastikan ini terimport dengan benar
 
export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    console.log("📤 Uploading file to Cloudinary...");

    const imageUrl = await uploadImage(file);

    console.log("✅ Cloudinary URL:", imageUrl);
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error("❌ Upload error:", error);
    return NextResponse.json({ error: error.message || "Upload gagal" }, { status: 500 });
  }
}
