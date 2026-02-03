import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit animation
        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.95,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            document.body.classList.remove('loading');
            onComplete();
          }
        });
      }
    });

    // Initial animations
    tl.from(nameRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4')
    .to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const currentProgress = Math.round(this.progress() * 100);
        setProgress(currentProgress);
      }
    }, '-=0.2');

    // Add body loading class
    document.body.classList.add('loading');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={preloaderRef} 
      className="preloader"
    >
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="glow-orb w-96 h-96 bg-primary/30 top-1/4 left-1/4 animate-float" />
        <div className="glow-orb w-64 h-64 bg-secondary/30 bottom-1/4 right-1/4 animate-float float-delayed" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Name */}
        <div 
          ref={nameRef}
          className="text-5xl md:text-7xl font-bold gradient-text mb-2"
        >
          Ashish
        </div>

        {/* Tagline */}
        <div 
          ref={taglineRef}
          className="text-muted-foreground text-lg md:text-xl tracking-widest uppercase mb-12"
        >
          Portfolio Loading
        </div>

        {/* Progress bar */}
        <div className="progress-container">
          <div 
            ref={progressBarRef}
            className="progress-bar"
          />
        </div>

        {/* Percentage */}
        <span 
          ref={percentRef}
          className="mt-4 text-primary font-mono text-sm tracking-wider"
        >
          {progress}%
        </span>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};

export default Preloader;
