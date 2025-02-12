 
import prisma from "@/lib/prisma";   
import CategoryList from "./products/categorylist";


export default async function CategoryListskleton() {

  const categories = await prisma.category.findMany(); 
  return (<>
      <CategoryList categories={categories} />
  </>
    
      
      
  );
}
