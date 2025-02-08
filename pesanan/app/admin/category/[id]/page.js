import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  const categoryId = params.id;

  // Ambil data kategori & produk berdasarkan kategori
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
    include: {
      products: true, // Ambil semua produk dalam kategori ini
    },
  });

  if (!category) {
    return <p className="text-center text-red-500">Kategori tidak ditemukan!</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Kategori: {category.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {category.products.length > 0 ? (
          category.products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              {product.image && (
                <div className="relative w-full h-40">
                {product.image}
                  
                </div>
              )}
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-500 font-bold mt-1">Rp {product.price.toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Belum ada produk dalam kategori ini.</p>
        )}
      </div>

      <div className="mt-6">
        <Link href="/admin" className="text-blue-500 underline">
          ← Kembali ke Semua Produk
        </Link>
      </div>
    </div>
  );
}
