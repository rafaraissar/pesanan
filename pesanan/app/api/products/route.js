import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }, // Untuk menampilkan kategori
    });
    return Response.json(products);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const categoryId = formData.get("categoryId");
    const file = formData.get("file");

    if (!name || !description || !price || !categoryId) {
      return Response.json({ error: "Semua field harus diisi!" }, { status: 400 });
    }

    let imageUrl = null;
    if (file) {
      imageUrl = await uploadImage(file); // Upload gambar ke Cloudinary
    }

    const product = await prisma.product.create({
      data: { name, description, price, categoryId, image: imageUrl },
    });

    return Response.json(product);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
