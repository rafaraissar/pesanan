"use server";

import prisma from "./prisma";

import { revalidatePath } from "next/cache";

// ✅ Update Order Status
export async function updateOrder(id, status) {
  await prisma.order.update({
    where: { id },
    data: { status },
  });

  revalidatePath("/admin/orders"); // Refresh data tanpa reload halaman
}

export async function getOrders() {
  const orders = await prisma.order.findMany();
  return orders || []; // ✅ Selalu return array
}


// ✅ Delete Order
export async function deleteOrder(id) {
  await prisma.order.delete({
    where: { id },
  });

  revalidatePath("/admin/orders"); // Refresh data tanpa reload halaman
}
 