import { createOrder, getOrders } from "@/lib/orders";
import { NextResponse } from "next/server";

// ✅ GET - Ambil semua order
export async function GET() {
  const orders = await getOrders();
  return NextResponse.json(orders);
}

// ✅ POST - Buat order baru
export async function POST(req) {
  try {
    const { productId, quantity, totalPrice } = await req.json();
    const newOrder = await createOrder({ productId, quantity, totalPrice });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Gagal membuat order" }, { status: 500 });
  }
}
