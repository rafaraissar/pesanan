"use client";
import { useEffect, useState } from "react";

export default function GalleryLayout({ children }) {
  console.log("VAPID Public Key:", process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY);

  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null); // Tambahkan state untuk subscription
  const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

  function urlBase64ToUint8Array(base64String) {
    if (!base64String) {
      console.error("Public key tidak ditemukan!");
      return null;
    }

    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
  }

  useEffect(() => {
    async function registerServiceWorker() {
      if (!("serviceWorker" in navigator)) {
        console.error("Service Worker tidak didukung di browser ini.");
        return;
      }
  
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
  
        if (registration.installing) {
          console.log("Service Worker sedang diinstall...");
        } else if (registration.waiting) {
          console.log("Service Worker sudah terinstall dan menunggu...");
        } else if (registration.active) {
          console.log("Service Worker sudah aktif!", registration);
        }
      } catch (error) {
        console.error("Gagal mendaftarkan Service Worker:", error);
      }
    }
  
    registerServiceWorker();
  }, []);
  

  return (
    <section>
      <button
       onClick={async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            let existingSubscription = await registration.pushManager.getSubscription();
      
            if (!existingSubscription) {
              console.log("🔄 Membuat subscription baru...");
              existingSubscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
              });
              console.log("✅ Subscription baru dibuat:", existingSubscription);
              setIsSubscribed(true);
            }
      
            // Kirim ke backend
            const res = await fetch("/api/subscribe", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ subscription: existingSubscription }),
            });
      
            const data = await res.json();
            console.log("✅ Subscription berhasil dikirim ke backend:", data);
          } catch (err) {
            console.error("❌ Error saat subscribe:", err);
          }
        }}
      >
        Kirim Notifikasi
      </button>
      {isSubscribed ? <p>Notifikasi Aktif!</p> : <p>Menunggu izin notifikasi...</p>}
      {children}
    </section>
  );
}
