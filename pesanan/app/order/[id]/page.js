import { getProduct } from "@/lib/products";
import { placeOrder } from "@/lib/orders";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function OrderPage({ params }) {
    const { id } = await params; 
  const product = await getProduct(id);

  if (!product) {
    return <div className="p-6">❌ Produk tidak ditemukan.</div>;
  }

  async function handleOrder(formData) {
    "use server"; // Server action untuk buat order
    const quantity = parseInt(formData.get("quantity")); 
    await placeOrder(product.id, quantity);
    redirect("/order/success"); // Redirect ke halaman sukses
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛒 Order {product.name}</h1>
      <div className="border p-4 rounded-lg flex gap-4">
        <Image src={product.image} alt={product.name} width={200} height={200} className="rounded" />
        <div>
          <p className="text-lg font-semibold">{product.name}</p>
          <p className="text-gray-700">Kategori: {product.category.name}</p>
          <p className="text-xl font-bold mt-2">Rp {product.price.toLocaleString()}</p>

          <form action={handleOrder} className="mt-4">
            <label className="block text-gray-700">Jumlah:</label>
            <input
              type="number"
              name="quantity"
              defaultValue="1"
              min="1"
              className="border p-2 w-20 rounded"
              required
            />
            <button type="submit" className="ml-4 px-4 py-2 bg-blue-500 text-white rounded">
              ✅ Pesan Sekarang
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
