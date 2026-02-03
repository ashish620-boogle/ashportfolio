import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Publications from '@/components/Publications';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Prevent scroll during loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <Preloader onComplete={() => setIsLoading(false)} />
      )}

      {/* Main content */}
      <div className={`min-h-screen ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Publications />
        <Projects />
        <Contact />
        <Footer />
      </div>

      {/* Global background effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, hsl(185 100% 50% / 0.08), transparent),
              radial-gradient(ellipse 60% 40% at 100% 100%, hsl(260 70% 60% / 0.08), transparent),
              radial-gradient(ellipse 40% 60% at 0% 50%, hsl(200 100% 60% / 0.05), transparent)
            `
          }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(185 100% 50%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(185 100% 50%) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />
      </div>
    </>
  );
};

export default Index;
