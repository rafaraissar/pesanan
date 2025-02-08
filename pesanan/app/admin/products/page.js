 
import styles from "./products.module.css";
import ProductList from "./productlist"; 
import { CirclePlus } from 'lucide-react';  
import CreateProductPage from "../addproduct/page";
export default function ProductsPage() {
 
  return (
    <>
     <div className={styles.tabadmin}>
    <div className={styles.tabadminkiri}>
      <div className={styles.tabadminkirilist}>hey</div>
      <div className={styles.tabadminkirilist}>hey</div>
    </div>
    <div className={styles.tabadminkanan}>
      <div className={styles.tabadminkananadd}><CirclePlus size={16} />&nbsp;Add Product</div>
    </div>
  </div>
  <div className={styles.mainadmin}>
    <div className={styles.juduladmin}>
      <h3>Product</h3>
      <p>Manage your products and view their sales performance.</p>
     <CreateProductPage />
    </div>
  </div>
    </>
   
  );
}
