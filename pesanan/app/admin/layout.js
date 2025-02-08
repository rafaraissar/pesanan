 
 
import styles from "./admin.module.css"; 
import Headeradmin from "./header";
 
 

export default function AdminLayout({ children}) {
  // Await params to ensure we have access to its properties
  
  return (
    <section> 
    <Headeradmin />
    <div className={styles.bodyadmin}>
    <div className={styles.judulhalaman}>Dashboard</div>
 
        {children}
        </div>
    </section>
  );
}
