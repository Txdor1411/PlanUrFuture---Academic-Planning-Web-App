import { CTASection } from "./components/cta-section";
import { DemoSection } from "./components/demo-section";
import { Features } from "./components/features";
import { Footer } from "./components/footer";
import { Hero } from "./components/hero";
import { HowItWorks } from "./components/how-it-works";
import { Navbar } from "./components/navbar";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-transparent" />
      <div className="absolute inset-x-0 top-[-10%] h-80 bg-[radial-gradient(circle,_rgba(56,189,248,0.18)_0%,_transparent_50%)] blur-3xl" />
      <Navbar />
      <main className="flex flex-1 flex-col gap-4 pb-24">
        <Hero />
        <Features />
        <HowItWorks />
        <DemoSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
