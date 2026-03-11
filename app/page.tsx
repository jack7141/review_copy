import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorks } from "@/components/how-it-works";
import { ExampleSection } from "@/components/example-section";
import { UseCasesSection } from "@/components/use-cases-section";
import { PricingSection } from "@/components/pricing-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <HowItWorks />
      <ExampleSection />
      <UseCasesSection />
      <PricingSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
