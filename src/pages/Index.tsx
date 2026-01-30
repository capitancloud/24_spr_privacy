import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import ConceptsSection from '@/components/ConceptsSection';
import SimulatorSection from '@/components/SimulatorSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <IntroSection />
      <ConceptsSection />
      <SimulatorSection />
      <Footer />
    </div>
  );
};

export default Index;
