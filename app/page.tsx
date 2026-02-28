import Hero from "@/components/hero-section";
import Solution from "@/components/treatments-section";
import Advantage from "@/components/why-choose-section";
import { FAQSection } from "@/components/faq-section";
import { Header } from "@/components/header";
import ClinicLocationMap from "@/components/maps";
import Problem from "@/components/problem";
import FinalCTA from "@/components/caurosel";
import CombinedTrustEnquiry from "@/components/doctor-section";
import ProcessTimeline from "@/components/process";
import Footerone from "@/components/footer";
import CombinedSection from "@/components/consultation-modal";
import Footer from "@/components/footer";
import ShuffleHero from "@/components/hero-section";
import HairTransplant from "@/components/commonseven";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen">
        <Header />
        <Hero />
        {/* <section id="contact-section"> */}
        <Problem />
        {/* </section> */}
   <Advantage />
        <Solution />

        <CombinedTrustEnquiry />
        <ProcessTimeline />
        <HairTransplant />
     
        <FinalCTA />
        <section id="form">
          <CombinedSection />
        </section>
        <FAQSection />

        <Footer />
      </main>
    </>
  );
}
