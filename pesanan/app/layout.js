 
import "./globals.css";
 
 
export const metadata = {
  title: "Adara",
  description: "Adara orderan", 
  manifest: "/manifest.json",
};
 

export const viewport = {
  themeColor: "#000000", 
};


export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        {children}
      </body>
    </html>
  );
}
