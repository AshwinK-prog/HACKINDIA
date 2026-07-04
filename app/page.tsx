import { Hero } from "@/landing/components/Hero";
import { Problem } from "@/landing/components/Problem";
import { LiveDemo } from "@/landing/components/LiveDemo";
import { HowItWorks } from "@/landing/components/HowItWorks";
import { Features } from "@/landing/components/Features";
import { Architecture } from "@/landing/components/Architecture";
import { DashboardPreview } from "@/landing/components/DashboardPreview";
import { Statistics } from "@/landing/components/Statistics";
import { FAQ } from "@/landing/components/FAQ";
import { CTA } from "@/landing/components/CTA";
import { Footer } from "@/landing/components/Footer";
import { Header } from "@/landing/components/Header";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 w-full flex flex-col items-center">
        <Hero />
        <Problem />
        <LiveDemo />
        <HowItWorks />
        <Features />
        <Architecture />
        <DashboardPreview />
        <Statistics />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
