"use client"; 
 
import AdminOrders from "./adminorder";
import { useState, useEffect, useRef } from "react";
 

export default function OrdersPage() {
  
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const prevProductCount = useRef(0); // Simpan jumlah sebelumnya
    

    useEffect(() => {
   
        async function fetchOrders() {
            try {
                const res = await fetch("/api/orders", { cache: "no-store" });
                if (!res.ok) throw new Error("Gagal mengambil data order");
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
 
        const interval = setInterval(fetchOrders, 500);
        return () => clearInterval(interval);
    }, []); 

 
    if (orders.length > prevProductCount.current) {
     // console.log("🚀 Jumlah produk bertambah!", orders.length);
     alert("ada order")
  }
  prevProductCount.current = orders.length; // Simpan jumlah terbaru

 // console.log("b", prevProductCount.current);

 
    if (loading) return <p>⏳ Loading...</p>;
    if (error) return <p>❌ {error}</p>;

  return <AdminOrders orders={orders} />; // Kirim sebagai props
}
