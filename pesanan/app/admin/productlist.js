"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();

      setProducts(productsData);
      setCategories(categoriesData);
      setLoading(false);
    }

    fetchData();
  }, []);

  async function handleDelete(productId) {
    const confirmed = confirm("Yakin ingin menghapus produk ini?");
    if (!confirmed) return;

    // Optimistic UI: Hapus dari UI dulu
    setProducts((prev) => prev.filter((p) => p.id !== productId));

    // Hapus dari database
    const res = await fetch(`/api/products/${productId}`, { method: "DELETE" });

    if (!res.ok) {
      alert("Gagal menghapus produk!");
      // Jika gagal, kembalikan produk ke UI
      setProducts((prev) => [...prev, { id: productId }]);
    }
  }

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>

      {/* Filter Kategori */}
      <div className="flex gap-4 mb-6">
        <Link href="/admin" className="text-blue-500 underline">
          Semua Produk
        </Link>
        {categories.map((category) => (
          <Link key={category.id} href={`/admin/category/${category.id}`} className="text-blue-500 underline">
            {category.name}
          </Link>
        ))}
      </div>

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
            <button
              onClick={() => handleDelete(product.id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
