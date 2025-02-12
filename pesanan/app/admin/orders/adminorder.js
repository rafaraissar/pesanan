"use client";

import { useState, useOptimistic, useTransition, useEffect } from "react";
import { updateOrder, deleteOrder } from "@/lib/actionorder";
import { useRouter } from "next/navigation"; 

export default function AdminOrders({ orders = [] }) { // Default ke array kosong
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticOrders, updateOptimisticOrders] = useOptimistic(
    orders || [], // Pastikan selalu array
    (state, { id, status }) =>
      state.map((order) =>
        order.id === id ? { ...order, status } : order
      )
  );

  if (!orders || orders.length === 0) {
    return <p className="text-center text-gray-500">Belum ada order</p>;
  }
  

  return (
    <div className="p-6">
     
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Produk</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {optimisticOrders.map((order) => (
            <tr key={order.id} className="border">
              <td className="border p-2">{order.product?.name || "Produk tidak ditemukan"}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">Rp {order.totalPrice.toLocaleString()}</td>
              <td className="border p-2">
                <form action={async (formData) => {
                  const id = formData.get("id");
                  const status = formData.get("status");

                  updateOptimisticOrders({ id, status });
                  await updateOrder(id, status);
       
                  router.refresh();
            
                }}>
                  <input type="hidden" name="id" value={order.id} />
                  <label htmlFor="fileUpload"  >ss</label>
                  <select name="status" id="fileUpload" defaultValue={order.status} className="border p-1">
                 
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
              
                  <button type="submit" className="ml-2 px-2 py-1 bg-blue-500 text-white rounded">
                    ✅
                  </button>
                </form>
              </td>
              <td className="border p-2">
                <form action={async (formData) => {
          console.log("c");
                      startTransition(async () => {
                        const id = formData.get("id");
                        updateOptimisticOrders((state) =>
                          state.filter((order) => order.id !== id)
                        );
                        await deleteOrder(id);
                        router.refresh();
                      console.log("a");
                      
                      });
                      console.log("b");
                      
             


                }}>
                  <input type="hidden" name="id" value={order.id} />
                  <button type="submit" className="px-2 py-1 bg-red-500 text-white rounded" disabled={isPending}>
                  {isPending ? "Loading..." : "hapus"}
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
