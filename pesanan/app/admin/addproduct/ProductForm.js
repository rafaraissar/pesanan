"use client";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

export default function ProductForm({ createProduct, categories }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    startTransition(async () => {
      const result = await createProduct(formData);
      if (result?.error) {
        setError(result.error);
      }
      else if (result) {
        console.log("berhasil");
        redirect("/admin");  

    }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
      <div>
        <label className="block font-semibold">Nama Produk</label>
        <input type="text" name="name" required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold">Deskripsi</label>
        <textarea name="description" required className="w-full p-2 border rounded"></textarea>
      </div>

      <div>
        <label className="block font-semibold">Harga</label>
        <input type="number" name="price" step="0.01" required className="w-full p-2 border rounded" />
      </div>

      <div>
        <label className="block font-semibold">Kategori</label>
        <select name="categoryId" required className="w-full p-2 border rounded">
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block font-semibold">Upload Gambar</label>
        <input type="file" name="file" accept="image/*" className="w-full p-2 border rounded" />
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-400"
        disabled={isPending}
      >
        {isPending ? "Loading..." : "Simpan Produk"}
      </button>
    </form>
  );
}
