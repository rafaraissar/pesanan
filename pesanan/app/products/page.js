import Link from "next/link"; 
import prisma from "@/lib/prisma";    

export const revalidate = 10; // Revalidate setiap 60 detik


export default async function Home() {
  const products = await prisma.product.findMany();  
  return (
    <> 

<div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>

 
      <Link href="/order" className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded">
         tete
         
            </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            {product.image && (
              <div className="relative w-full h-40">
                 
               {product.image}
                 
              </div>
            )}
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-500 font-bold mt-1">Rp {product.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              Kategori: <Link href={`/category/${product.categoryId}`} className="text-blue-500 underline">{product.category?.name || "Tidak ada"}</Link>
            </p> 
            <Link
              href={`/admin/products/edit/${product.id}`}
              className="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 block text-center"
            >
              Edit
            </Link>
            {/* Tombol Hapus */}
      
          </div>
        ))}

      </div>
      <Link href="/order" className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded">
         tete
         
            </Link>
    </div>
 

  
 

    </>
  );
}
