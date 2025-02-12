import Link from "next/link";

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <h1 className="text-3xl font-bold text-green-600">✅ Order Berhasil!</h1>
      <p className="text-lg text-gray-700 mt-2">Terima kasih telah melakukan order. Kami akan segera memproses pesanan Anda.</p>
      
      <div className="mt-6">
        <Link href="/order" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          🔙 Kembali ke Daftar Produk
        </Link>
      </div>
    </div>
  );
}
