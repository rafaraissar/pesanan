import prisma from "@/lib/prisma";

// **GET (Ambil semua kategori)**
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { products: true }, // Ambil juga produk dalam kategori
    });
    return Response.json(categories);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// **POST (Tambah kategori baru)**
export async function POST(req) {
  try {
    const { name } = await req.json();

    const category = await prisma.category.create({
      data: { name },
    });

    return Response.json(category);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
