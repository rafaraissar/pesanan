"use client";
import styles from "./page.module.css"; 
import Link from "next/link";
import { usePathname } from "next/navigation";
 

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <>
      <Link scroll={false}
      href={href}
      className={isActive ? styles.menupilihanaktif : styles.menupilihan}
    >
      {children}
    </Link>

 
    </>
  );
}
