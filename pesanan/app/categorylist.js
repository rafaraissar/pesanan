"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react"; 
import Link from "next/link";
import { usePathname } from "next/navigation"; 
 


const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={ 
        isActive ? styles.menupilihan : styles.menupilihan
      }
    >
      {children}
    </Link>
  );
};


export default function CategoryListhome({categories}) {

  const [local, setLokal] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const final = local || categories;
  useEffect(() => {
    async function fetchData() {
      const [ categoriesRes] = await Promise.all([
 
        fetch("/api/categories"),
      ]);

     
    
      const categoriesData = await categoriesRes.json();

   
 
 
      setLokal(categoriesData);
      setLoading(false);
 
    }
    
    fetchData();
  }, []);



  return (
    <>
 {loading ?

 <>
 
<NavLink href="/products" >
All
        </NavLink>
        {categories.map((category) => (
          <NavLink key={category.id} href={`/products/category/${category.id}`}  >
            {category.name}
          </NavLink>
        ))}
 </>

        : <>
           <NavLink href="/products" >
      All
              </NavLink>
              {final.map((category) => (
                <NavLink key={category.id} href={`/products/category/${category.id}`}  >
                  {category.name}
                </NavLink>
              ))}
        </>

   

 }
    
    </>
     
      
 
  );
}
