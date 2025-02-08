"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function EditProductForm({ product, categories }) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId || "",
    image: product.image,
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle perubahan input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle pemilihan file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 10 * 1024 * 1024) {
            alert("❌ Ukuran file terlalu besar! Maksimal 10MB.");
            e.target.value = ""; // Reset input file
            return;
          }
      setSelectedFile(file);
    }
  };

  async function uploadImage() {
    if (!selectedFile) return form.image; // Jika tidak ada file baru, pakai gambar lama
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    console.log("📤 Mengirim file ke API /api/upload...", selectedFile);
  
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Gagal upload gambar: " + errorText);
      }
  
      const data = await res.json();
      console.log("✅ Image uploaded:", data.url);
      return data.url;
    } catch (error) {
      console.error("❌ Upload error:", error);
      return form.image;
    }
  }

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Upload gambar dulu
      const imageUrl = await uploadImage();

      // Kirim data ke API update produk
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          image: imageUrl, // Simpan URL gambar baru
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal update produk");
      }

      router.push("/admin"); // Redirect ke halaman produk
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Product</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="mb-4">
        <label className="block font-semibold">Nama Produk</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Deskripsi</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Harga</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Kategori</label>
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Pilih Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-semibold">Gambar Produk</label>
        {form.image && (
          <div className="mb-2">
            <Image
              src={selectedFile ? URL.createObjectURL(selectedFile) : form.image}
              alt="Product Image"
              width={150}
              height={150}
              className="rounded border"
            />
          </div>
        )}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </form>
  );
}
