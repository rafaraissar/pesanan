
import styles from "./products.module.css"; 
import { CirclePlus } from "lucide-react";
import Link from "next/link";
import CategoryList from "./categorylist";

  
 
 

export default function ProductLayout({ children}) {
  // Await params to ensure we have access to its properties

  return (
    <section> 
         <div className={styles.tabadmin}>
        <div className={styles.tabadminkiri}>
      <CategoryList />
        </div>
        <div className={styles.tabadminkanan}>
          <Link
            href="/admin/addproduct"
            as="/admin/addproduct"
            scroll={false}
            modal="true"
            className={styles.tabadminkananadd}
          >
            <CirclePlus size={16} />
            &nbsp;Add Product
          </Link>
        </div>
      </div>

      <div className={styles.mainadmin}>
        <div className={styles.juduladmin}>
          <h3>Product</h3>
          <p>Manage your products and view their sales performance.</p>
          </div>
        {children}
        </div>
    </section>
  );
}
