'use client';

import { useState, useEffect } from 'react';
import { updateOrder, getOrders } from '@/lib/actionorder';

export default function AdminOrders({ initialOrders }) {
  const [orderList, setOrderList] =  useState(initialOrders || []);

  // ✅ Fetch data setiap 5 detik untuk update otomatis
  useEffect(() => {
    const interval = setInterval(async () => {
      const updatedOrders = await getOrders(); // 🔥 Ambil data terbaru
      setOrderList(updatedOrders);
    }, 500); // Fetch setiap 5 detik

    return () => clearInterval(interval); // Hapus interval saat unmount
  }, []);

  const handleUpdate = async (id, status) => {
    await updateOrder(id, status);
    console.log(  await updateOrder(id, status));
    // 🔥 Update state lokal agar langsung berubah di UI
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  return (
    <div>
      <h1>Admin Orders</h1>
      <ul>
        {orderList.map((order) => (
          <li key={order.id}>
            {order.product} - {order.status}
            <button onClick={() => handleUpdate(order.id, "Shipped")}>
              Ship Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
