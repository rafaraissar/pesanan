import prisma from "@/lib/prisma";

export default async function CategorySelect() {
  const categories = await prisma.category.findMany();

  return (
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
  );
}
