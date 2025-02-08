import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({ params }) {
// ⬅️ Gunakan langsung tanpa Number()
  const { id } = await params; 
  const productId = id; 
  if (!productId) {
    return notFound();
  }

  // Fetch produk berdasarkan UUID
  const product = await prisma.product.findUnique({
    where: { id: productId }, // ⬅️ Prisma mendukung UUID sebagai string
    include: { category: true },
  });

  if (!product) {
    return notFound();
  }

  // Fetch semua kategori untuk dropdown
  const categories = await prisma.category.findMany();

  return <EditProductForm product={product} categories={categories} />;
}
