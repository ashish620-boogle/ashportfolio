import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown } from '@phosphor-icons/react';

const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const [loadSpline, setLoadSpline] = useState(false);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce), (max-width: 768px)', () => {
      return () => {};
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
      const tl = gsap.timeline({ delay: 3.2 });

      // Headline animation
      tl.from(headlineRef.current, {
        y: 50,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        filter: 'blur(5px)',
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.3')
      .from(scrollIndicatorRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: 'power2.out'
      }, '-=0.2');

      // Floating orbs animation
      gsap.to(orb1Ref.current, {
        y: -30,
        x: 10,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });

      gsap.to(orb2Ref.current, {
        y: 20,
        x: -15,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 1
      });

      gsap.to(orb3Ref.current, {
        y: -25,
        x: 20,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 2
      });

      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      setLoadSpline(false);
      return;
    }

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(() => setLoadSpline(true))
      : window.setTimeout(() => setLoadSpline(true), 1200);

    return () => {
      if (typeof idle === 'number') {
        window.clearTimeout(idle);
      } else if (idle) {
        window.cancelIdleCallback?.(idle);
      }
    };
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      aboutSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        {loadSpline ? (
          <iframe 
            src="https://my.spline.design/liquidchrome-UV4WCsK781oEsfWlJ6UR1J6z/" 
            frameBorder="0" 
            width="100%" 
            height="100%"
            loading="lazy"
            className="opacity-60"
            title="3D Background"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
        )}
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
      </div>

      {/* Floating neon orbs */}
      <div 
        ref={orb1Ref}
        className="glow-orb w-80 h-80 bg-primary/20 top-20 right-20 hidden md:block"
      />
      <div 
        ref={orb2Ref}
        className="glow-orb w-64 h-64 bg-secondary/30 bottom-40 left-10 hidden md:block"
      />
      <div 
        ref={orb3Ref}
        className="glow-orb w-48 h-48 bg-accent/25 top-1/2 left-1/4 hidden lg:block"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Headline */}
        <h1 
          ref={headlineRef}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Hi, I'm{' '}
          <span className="gradient-text text-glow">Ashish Kumar</span>
          <br />
          <span className="text-3xl md:text-5xl lg:text-6xl font-light text-muted-foreground">
            GenAI Developer & Data Analyst
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Building intelligent systems with NLP, RAG pipelines, and cutting-edge machine learning. 
          Currently pursuing M.Tech in AR/VR at IIT Jodhpur.
        </p>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#contact"
            className="btn-neon text-lg"
            onClick={(e) => {
              e.preventDefault();
              const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              document.querySelector('#contact')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            }}
          >
            Hire Me
          </a>
          <a 
            href="#projects"
            className="px-8 py-4 border border-primary/50 rounded-lg text-foreground hover:bg-primary/10 hover:border-primary transition-all duration-300"
            onClick={(e) => {
              e.preventDefault();
              const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              document.querySelector('#projects')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
            }}
          >
            View Projects
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToAbout}
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown size={24} className="animate-bounce" weight="light" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
