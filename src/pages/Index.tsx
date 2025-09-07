import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ChatWidget from '@/components/ui/chat-widget';
import HeroSection from '@/components/sections/HeroSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import ServicesPreview from '@/components/sections/ServicesPreview';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import CtaSection from '@/components/sections/CtaSection';

const Index = () => {
  return (
    <>
      <Header currentLang="es" />
      <main>
        <HeroSection lang="es" />
        <BenefitsSection lang="es" />
        <ProcessSection lang="es" />
        <ServicesPreview lang="es" />
        <TestimonialsSection lang="es" />
        <CtaSection lang="es" />
      </main>
      <Footer currentLang="es" />
      <ChatWidget lang="es" />
    </>
  );
};

export default Index;
