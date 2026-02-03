import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GithubLogo, 
  LinkedinLogo, 
  EnvelopeSimple,
  Heart,
  GraduationCap
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-content', {
        y: 60,
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#publications', label: 'Publications' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-12 overflow-hidden border-t border-border/30"
    >
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-48 h-48 bg-primary/5 top-0 left-1/4 animate-float" />
        <div className="glow-orb w-32 h-32 bg-secondary/10 bottom-0 right-1/3 animate-float float-delayed" />
        <div className="glow-orb w-24 h-24 bg-accent/10 top-1/2 right-10" />
      </div>

      <div className="footer-content max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a 
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#home');
              }}
              className="text-2xl font-bold gradient-text inline-block mb-2"
            >
              Ashish Kumar
            </a>
            <p className="text-sm text-muted-foreground">
              GenAI Developer & Data Analyst
            </p>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-end gap-4">
            <a 
              href="https://github.com/ashish620-boogle"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all group"
            >
              <GithubLogo size={20} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://www.linkedin.com/in/ashish-kumar-13a605197/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all group"
            >
              <LinkedinLogo size={20} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="https://scholar.google.com/citations?user=-gl_BFsAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all group"
            >
              <GraduationCap size={20} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
            <a 
              href="mailto:ashishboogle810@gmail.com"
              className="p-3 glass-card rounded-lg hover:bg-primary/10 hover:border-primary/50 transition-all group"
            >
              <EnvelopeSimple size={20} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Ashish Kumar. Made with 
            <Heart size={16} weight="fill" className="text-red-500" />
            and lots of ☕
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
