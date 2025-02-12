 
import prisma from "@/lib/prisma";
import ProductList from "./ProductList"; 
import { getAllProducts } from "@/lib/products";
import Link from "next/link";
// ✅ Fungsi untuk mengambil semua produk

export default async function ProductsPage() {
  // Fetch data langsung dari database dengan Prisma
  const products = await getAllProducts();
  const categories = await prisma.category.findMany();
  const productsss = JSON.stringify(products); 
  console.log(productsss);
  console.log(products);
  //    <ProductList products={products} categories={categories} />
  return (
  <>
    {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            {product.image && (
              <div className="relative w-full h-40">
                
             {product.name} 
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
            
          </div>
        ))}
 

  </>

    );
}

 