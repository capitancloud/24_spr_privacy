import HeroSection from '@/components/HeroSection';
import IntroSection from '@/components/IntroSection';
import ConceptsSection from '@/components/ConceptsSection';
import SimulatorSection from '@/components/SimulatorSection';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';
import LoginPage from '@/components/LoginPage';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="pt-16">
        <HeroSection />
        <IntroSection />
        <ConceptsSection />
        <SimulatorSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
