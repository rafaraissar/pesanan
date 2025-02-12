import { prisma } from "@/lib/prismadua"; // Import Prisma Client
 
import Image from "next/image";
import Link from "next/link";
 
export const revalidate = 10; // Revalidate setiap 60 detik

export default async function OrderList() {
  const products = await getProducts();

  return (
  
             
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
    

  );
}


async function getProducts() {
 
  return  await prisma.product.findMany();   // Ambil semua produk dari database
}

export const dynamic = "force-dynamic"; 