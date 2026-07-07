import Header from "@/components/atoms/Header";
import Footer from "@/components/atoms/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
