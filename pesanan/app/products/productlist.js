"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import CategoryListskleton from "../categorylistskeleton";
import Home from "./page";

export default function ProductList() {

  const [local, setLokal] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const final = local;

  useEffect(() => {
    async function fetchData() {
      const [productsRes] = await Promise.all([
        fetch("/api/products"),
 
      ]);

      const productsData = await productsRes.json();
 

      setLokal(productsData);
 
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
 
 
  return (


    <>
    
   

 

<div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Daftar Produk</h1>

 

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {final.map((product) => (
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
    </div>
 

  </>

  );
}
