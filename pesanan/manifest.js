export default function manifest() {
  return {
    name: 'Adara',
    short_name: 'Adara',
    description: 'Adara orderan',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}