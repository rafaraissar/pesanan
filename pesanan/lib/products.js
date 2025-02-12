 
import prisma from "./prisma"; 
// ✅ Fungsi untuk mengambil satu produk berdasarkan ID
export async function getProduct(id) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true }, // Ambil kategori produk
  });
}

// ✅ Fungsi untuk mengambil semua produk
export async function getAllProducts() {
    return await prisma.product.findMany({
      include: { category: true }, // Ambil kategori produk juga
      orderBy: { createdAt: "desc" }, // Urutkan produk terbaru
    });
  }
