import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Attorney from "@/components/Attorney";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <Attorney />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
