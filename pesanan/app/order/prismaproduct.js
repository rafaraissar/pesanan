 
import Link from 'next/link';    
import { prisma } from "@/lib/prismadua"; // Import Prisma Client
 
import Image from "next/image"; 
  
async function getProductsapi() {
  const host = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${host}/api/products`, {
    cache: "no-store", // Untuk selalu mengambil data terbaru
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data produk");
  }

  return res.json();
}

export default async function OrderListPage() {
  const products = await getProductsapi() ;
  
  if (!products || products.length === 0) {
    products = await getProducts(); // Langsung assign ulang
  }

  return (
    <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">🛒 Daftar Produk</h1>
    <Link href="/" className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded">
       tete

          </Link>
        

             
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <Image src={product.image} alt={product.name} width={300} height={200} className="rounded" />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700">Kategori: {product.category?.name}</p>
            <p className="text-xl font-bold mt-2">Rp {product.price.toLocaleString()}</p>
            <Link href={`/order/${product.id}`} className="mt-2 inline-block px-4 py-2 bg-blue-500 text-white rounded">
              🛍 Order Sekarang
            </Link>
          </div>
        ))}
      </div>
    
   
   </div>
  );
}  

async function getProducts() {
 
  return  await prisma.product.findMany();   // Ambil semua produk dari database
}