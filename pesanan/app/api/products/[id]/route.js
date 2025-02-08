import { PrismaClient } from "@prisma/client";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
 
const prisma = new PrismaClient();

// **GET (Ambil produk berdasarkan ID)**
export async function GET(req, { params }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });
    if (!product) return Response.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    return Response.json(product);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
 

export async function PUT(req, { params }) {
    try {
      const { id } = params; // ⬅️ Gunakan langsung karena UUID adalah string
      const body = await req.json();
  
      console.log("✅ Data diterima di API:", body);
  
      const updatedProduct = await prisma.product.update({
        where: { id }, // ⬅️ UUID tetap string
        data: {
          name: body.name,
          description: body.description,
          price: Number(body.price),
          categoryId: body.categoryId || null,
          image: body.image,
        },
      });
  
      return NextResponse.json(updatedProduct);
    } catch (error) {
      console.error("❌ Error updating product:", error);
      return NextResponse.json({ error: "Gagal update produk" }, { status: 500 });
    }
  }
// **DELETE (Hapus produk)**
export async function DELETE(req, { params }) {
  try {
    await prisma.product.delete({
      where: { id: params.id },
    });
    return Response.json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
