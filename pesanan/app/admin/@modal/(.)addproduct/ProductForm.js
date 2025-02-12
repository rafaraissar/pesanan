"use client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Upload } from "lucide-react";
import styles from "./addproducts.module.css";
import Image from "next/image";
export default function ProductForm({ createProduct, categories }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [form, setForm] = useState({
    image: "",
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.target);

    startTransition(async () => {
      const result = await createProduct(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result) {
        console.log("berhasil1");
        window.location.assign("/admin/products");
      }
    });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <input
            type="text"
            name="name"
            placeholder="Nama Product"
            required
            className={styles.input}
          />
        </div>

        <div>
          <select name="description" required className={styles.input}>
            <option value="">Pilih Status</option>
            <option value="Active">Active</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div>
          <input
            type="number"
            name="price"
            step="0.01"
            required
            placeholder="Harga"
            className={styles.input}
          />
        </div>

        <div>
          <select name="categoryId" required className={styles.input}>
            <option value="">Pilih Kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.inputimagelabelwrapper}>
          <label htmlFor="fileUpload" className={styles.inputimagelabel}>
            {" "}
            {selectedFile && (
              <Image
                src={selectedFile ? URL.createObjectURL(selectedFile) : null}
                alt="Product Image"
                width={250}
                height={250}
                style={{ objectFit: "cover" }}
                className="rounded border"
              />
            )}{" "}
            {!selectedFile && <Upload />}
          </label>

          <input
            type="file"
            name="file"
            accept="image/*"
            id="fileUpload"
            onChange={handleFileChange}
            className={styles.inputimage}
          />
        </div>
        <div className={styles.buttonwrapper}>
          <div   className={styles.buttoncancel} onClick={() => router.back()}>
     cancel
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button type="submit" className={styles.button} disabled={isPending}>
            {isPending ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </>
  );
}
