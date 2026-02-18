import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TrustBadges } from "@/components/landing/trust-badges";

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TrustBadges />
    </>
  );
}
