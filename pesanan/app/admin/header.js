import Image from "next/image";
import { ShoppingCart, Package } from "lucide-react";
import styles from "./admin.module.css";
import Link from "next/link";
export default function Headeradmin() {
  return (
    <>
      <div className={styles.headerwrapper}>
        <div className={styles.header}>s</div>

        <div className={styles.menupilihanwrapper}>
          <div className={styles.menupilihan} title="Pesanan">
            <ShoppingCart size={20} />
          </div>
          <Link
              href="/admin/products" className={styles.menupilihan}>
            <Package size={20} />
          </Link>
          <div className={styles.menupilihan}>
            <ShoppingCart size={20} />
          </div>
        </div>
      </div>
    </>
  );
}
