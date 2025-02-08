import prisma from "@/lib/prisma";

// **GET (Ambil kategori berdasarkan ID)**
export async function GET(req, { params }) {
  try {
    const category = await prisma.category.findUnique({
      where: { id: params.id },
      include: { products: true },
    });
    if (!category) return Response.json({ error: "Kategori tidak ditemukan" }, { status: 404 });
    return Response.json(category);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// **PUT (Update kategori)**
export async function PUT(req, { params }) {
  try {
    const { name } = await req.json();

    const updatedCategory = await prisma.category.update({
      where: { id: params.id },
      data: { name },
    });

    return Response.json(updatedCategory);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// **DELETE (Hapus kategori)**
export async function DELETE(req, { params }) {
  try {
    await prisma.category.delete({
      where: { id: params.id },
    });
    return Response.json({ message: "Kategori berhasil dihapus" });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
