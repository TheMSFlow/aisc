import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Value from "@/components/sections/Value";
import Audience from "@/components/sections/Audience";
import Curriculum from "@/components/sections/Curriculum";
import Demo from "@/components/sections/Demo";
import Proof from "@/components/sections/Proof";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
// import Coaching from "@/components/sections/Coaching";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Value />
        <Audience />
        <Curriculum />
        <Demo />
        {/* <Proof /> */}
        <Pricing />
        {/* Coaching has its own landing page, /coaching, reached from the
            Chief card (founder, 2026-11-20). Kept, not deleted. */}
        {/* <Coaching /> */}
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
