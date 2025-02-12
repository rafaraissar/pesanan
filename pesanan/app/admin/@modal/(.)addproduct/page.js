import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import ProductForm from "./ProductForm";
import styles from "./addproducts.module.css";

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

  const res = await prisma.product.create({
    data: { name, description, price, categoryId, image: imageUrl },
  });
 

  return { success: true };
   
}

export default async function CreateProductPage() {
  const categories = await prisma.category.findMany();


  return (
    <div className={styles.modaladdproductwrapper}>
    <div className={styles.modaladdproduct}>
      <h1 className={styles.judulmodaladdproduct}>Add Product</h1>
      <ProductForm createProduct={createProduct} categories={categories} />
 
    </div>
    </div>
  );
}
