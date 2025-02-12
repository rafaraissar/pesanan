"use client";
import { useState, useEffect } from "react";


// Fungsi untuk mengonversi VAPID public key dari Base64 ke Uint8Array
const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; i++) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };
export default function Home() {
  const [loading, setLoading] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [message, setMessage] = useState('');
  const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
        
         navigator.serviceWorker.register('/sw.js', {
            scope: '/',
            updateViaCache: 'none',
          }).then((registration) => {
        console.log("Service Worker terdaftar:", registration);
  
        return navigator.serviceWorker.ready;
      }).then(async (registration) => {
        console.log("Service Worker siap:", registration);
  
        Notification.requestPermission().then(async (permission) => {
          if (permission === "granted") {
            const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
            const subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey,
            });
  
            await fetch("/api/subscribe", {
              method: "POST",
              body: JSON.stringify(subscription),
              headers: { "Content-Type": "application/json" },
            });
  
            console.log("Berhasil subscribe:", subscription);
          }
        });
      }).catch((error) => {
        console.error("Gagal register service worker:", error);
      });
    }
  }, []);
  
  console.log("VAPID Key:", VAPID_PUBLIC_KEY);

  const sendNotification = async () => {
    setLoading(true);
    const res = await fetch("/api/notify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hello!", message: "Notifikasi dari tombol!" }),
    });
    setLoading(false);
    if (res.ok) {
      alert("Notifikasi berhasil dikirim!");
    } else {
      alert("Gagal mengirim notifikasi.");
    }
  };

  return (
    <div>
      <h1>Web Push Notification</h1>
      <button onClick={sendNotification} disabled={loading}>
        {loading ? "Mengirim..." : "Kirim Notifikasi"}
      </button>
    </div>
  );
}

 