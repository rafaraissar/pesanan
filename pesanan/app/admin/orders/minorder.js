'use client';

import { useState, useEffect } from 'react';
import { updateOrder } from '@/lib/actionorder';

export default function MinOrder({ orders = [] }) { // ✅ Default orders ke array kosong
  const [orderList, setOrderList] = useState(orders || []); // ✅ Pastikan state tidak undefined

  const handleUpdate = async (id, status) => {
    await updateOrder(id, status);
    
    setOrderList((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: status } : order
      )
    );
  };

  return (
    <div>
      <h1>Admin Orders</h1>
      {orders.length === 0 ? (
        <p>Tidak ada order.</p> // ✅ Tambahkan handling jika orders kosong
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.id} - {order.status}
              <button onClick={() => handleUpdate(order.id, "Shipped")}>
                Ship Order
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
