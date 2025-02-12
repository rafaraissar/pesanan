 
 "use client";
 import { usePathname } from "next/navigation"; 
 import styles from "./admin.module.css";  
 import { useEffect, useState } from "react";   
 import { ChevronRight } from 'lucide-react';
 
 
export default function Segment() {

    // Await params to ensure we have access to its properties
    const pathname = usePathname(); // "/products/shoes"
    const firstSegment = pathname.split("/")[2]; // "products"
    const fourSegment = pathname.split("/")[4]; // "products"
  
  
  
  
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
   
  
   const category = categories.find((p) => p.name.toString() === fourSegment);
   
  if (loading) return <p className="text-center">Loading...</p>;
  
  return (
    <div className={styles.judulhalaman}>
    <div>Dashboard</div>

    {firstSegment && (
      <>
        <span>&nbsp;&nbsp;</span>
        <ChevronRight size={15} />
        <span>&nbsp;&nbsp;</span>
        <div>{firstSegment}</div>
      </>
    )}

    {fourSegment && category?.name && (
      <>
        <span>&nbsp;&nbsp;</span>
        <ChevronRight size={15} />
        <span>&nbsp;&nbsp;</span>
        <div>{category.name}</div>
      </>
    )}
  </div>
  );
}
