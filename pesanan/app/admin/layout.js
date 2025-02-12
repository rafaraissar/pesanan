 
import styles from "./admin.module.css"; 
import Headeradmin from "./header";  
import Segment from "./segment";

export default function AdminLayout({ children, modal}) {

  return (
    <section> 
  {modal}
    <Headeradmin />
    <div className={styles.bodyadmin}>
   <Segment />
        {children}
        </div>
    </section>
  );
}
