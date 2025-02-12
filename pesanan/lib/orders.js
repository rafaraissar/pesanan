 "use server"; // 🚀 Server Action
import prisma from "./prisma";

// ✅ Create Order
export async function createOrder({ productId, quantity, totalPrice }) {
  return await prisma.order.create({
    data: { productId, quantity, totalPrice },
  });
}

// ✅ Get All Orders
export async function getOrders() {
  return await prisma.order.findMany({
    include: { product: true },
    orderBy: { createdAt: "desc" },
  }, { cache: 'no-store' });
}

// ✅ Get Order by ID
export async function getOrderById(id) {
  return await prisma.order.findUnique({
    where: { id },
    include: { product: true },
  });
  
}

// ✅ Update Order Status
export async function updateOrder(id, status) {
  return await prisma.order.update({
    where: { id },
    data: { status },
  });
}

// ✅ Update pembayaran 
export async function updatePembayaran(id, pembayaran) {
  return await prisma.order.update({
    where: { id },
    data: { pembayaran },
  });
}

// ✅ Delete Order
export async function deleteOrder(id) {
  return await prisma.order.delete({
    where: { id },
  });
}

// ✅ Fungsi untuk membuat order baru
export async function placeOrder(productId, quantity) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new Error("Produk tidak ditemukan");

  const totalPrice = product.price * quantity;

  return await prisma.order.create({
    data: {
      productId,
      quantity,
      totalPrice,
      status: "pending",
    },
  });
}

