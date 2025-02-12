import Header from "./header";

export default function ProductLayout({ children }) {
  return (
    <section>
      <Header />
      {children}
    </section>
  );
}
