import { useState, useEffect, useRef } from 'react';
import { List, X } from '@phosphor-icons/react';
import gsap from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate navigation on load
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      delay: 3.5,
      ease: 'power3.out'
    });
  }, []);

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isOpen) {
        gsap.to(mobileMenuRef.current, {
          x: 0,
          duration: 0.5,
          ease: 'power3.out'
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          x: '100%',
          duration: 0.5,
          ease: 'power3.in'
        });
      }
    }
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a 
              href="#home" 
              className="text-2xl font-bold gradient-text"
              onClick={(e) => handleLinkClick(e, '#home')}
            >
              AK
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="nav-link text-sm font-medium tracking-wide uppercase"
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="btn-neon text-sm px-6 py-2"
                onClick={(e) => handleLinkClick(e, '#contact')}
              >
                Hire Me
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={28} weight="light" /> : <List size={28} weight="light" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="text-3xl font-light text-foreground hover:text-primary transition-colors"
              onClick={(e) => handleLinkClick(e, link.href)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-neon mt-8 text-lg px-8 py-4"
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Hire Me
          </a>
        </div>
      </div>
    </>
  );
};

export default Navigation;
