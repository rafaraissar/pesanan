
import styles from "./order.module.css"; 
import { CirclePlus } from "lucide-react";
import Link from "next/link"; 

  
 
 

export default function OrderLayout({ children}) {
  // Await params to ensure we have access to its properties

  return (
    <section> 
     

      <div className={styles.mainadmin}>
        <div className={styles.juduladmin}>
          <h1>Daftar Orderan</h1>
          <p>Manage your products and view their sales performance.</p>
          </div>
        {children}
        </div>
    </section>
  );
}
