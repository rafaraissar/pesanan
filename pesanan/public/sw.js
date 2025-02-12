self.addEventListener("install", event => {
    console.log("📌 Service Worker di-install");
    self.skipWaiting();
  });
  
  self.addEventListener("activate", event => {
    console.log("✅ Service Worker di-activate");
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener('push', (event) =>{
    console.log("Push event received:", event);
 
      const data = event.data.json();
      
      const options = {
        body: data.body,
        icon: data.icon || '/icon.png',
        badge: '/icon.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: '2',
        },
        requireInteraction: true, 
      };
      console.log("Notification data:", data);
      console.log("Notification data:", options);
      event.waitUntil(self.registration.showNotification(data.title, options));
   
  });
  
   
  

 
  
  self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(clients.openWindow('https://pesanan-blond.vercel.app/'));
  });
  
  