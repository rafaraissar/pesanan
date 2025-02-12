"use client";
import styles from "./products.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";




const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={ 
        isActive ? styles.tabadminkirilistaktif : styles.tabadminkirilist
      }
    >
      {children}
    </Link>
  );
};


export default function CategoryList() {
 
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [ categoriesRes] = await Promise.all([
 
        fetch("/api/categories"),
      ]);

     
      const categoriesData = await categoriesRes.json();

   
      setCategories(categoriesData);
      setLoading(false);
    }

    fetchData();
  }, []);

  

  
  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <NavLink href="/admin/products" >
All
        </NavLink>
        {categories.map((category) => (
          <NavLink key={category.id} href={`/admin/products/category/${category.name}`}  >
            {category.name}
          </NavLink>
        ))}
    </>
     
      
 
  );
}
