import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import ProductForm from "./ProductForm";
import { NextResponse } from "next/server";
async function createProduct(formData) {
  "use server";

  const name = formData.get("name");
  const description = formData.get("description");
  const price = parseFloat(formData.get("price"));
  const categoryId = formData.get("categoryId");
  const file = formData.get("file");

  if (!name || !description || !price || !categoryId) {
    return { error: "Semua field harus diisi!" };
  }

  let imageUrl = null;
  if (file.size > 0) {
    imageUrl = await uploadImage(file);
  }

  await prisma.product.create({
    data: { name, description, price, categoryId, image: imageUrl },
  });

  redirect("/admin");
}

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <ProductForm createProduct={createProduct} categories={categories} />
    </div>
  );
}
