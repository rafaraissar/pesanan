"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCategory() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryName.trim()) return alert("Nama kategori tidak boleh kosong!");

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: categoryName }),
    });

    if (res.ok) {
      alert("Kategori berhasil ditambahkan!");
      router.push("/"); // Redirect ke halaman utama atau ke list kategori
    } else {
      alert("Gagal menambahkan kategori!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Tambah Kategori</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Nama Kategori</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Simpan Kategori
        </button>
      </form>
    </div>
  );
}
