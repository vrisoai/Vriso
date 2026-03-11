import {
  HeroSection,
  ValueProposition,
  CoreServices,
  WhyVRISO,
  OutcomeVaultSection,
  StrategicCTASection,
  VrisoLogoSection,
} from '@/app/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ValueProposition />
      <CoreServices />
      <WhyVRISO />
      <OutcomeVaultSection />
      <StrategicCTASection />
      <VrisoLogoSection />
    </main>
  );
}
