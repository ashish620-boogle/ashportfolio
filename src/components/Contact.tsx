import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EnvelopeSimple, PaperPlaneTilt, GithubLogo, LinkedinLogo, Phone } from '@phosphor-icons/react';
gsap.registerPlugin(ScrollTrigger);
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xkozlppk';
const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce), (max-width: 768px)', () => {
        return () => {};
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
        // Header animation
        gsap.from('.contact-header', {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Form elements animation
        gsap.from('.form-element', {
          x: -30,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Social icons animation
        gsap.from('.social-icon', {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.social-icons',
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        });

        return () => {};
      });
    });
    return () => ctx.revert();
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!formRef.current) {
        throw new Error('Form not ready. Please try again.');
      }

      if (FORMSPREE_ENDPOINT.includes('REPLACE_WITH_FORM_ID')) {
        throw new Error('Form endpoint not configured yet.');
      }

      const payload = new FormData(formRef.current);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: payload
      });

      if (!response.ok) {
        let message = 'Failed to send message. Please try again.';
        try {
          const data = await response.json();
          if (data?.errors?.[0]?.message) {
            message = data.errors[0].message;
          }
        } catch {
          // Ignore JSON parse errors and use default message.
        }
        throw new Error(message);
      }

      // Animate button on success
      gsap.to('.submit-btn', {
        scale: 1.1,
        duration: 0.2,
        yoyo: true,
        repeat: 1
      });

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });

      // Reset submitted state after delay
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to send message.';
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return <section id="contact" ref={sectionRef} className="section-container bg-gradient-to-b from-card/30 to-background">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-primary/10 top-0 right-1/4" />
        <div className="glow-orb w-64 h-64 bg-secondary/15 bottom-20 left-10" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="contact-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-lg mx-auto">
            Have a project in mind or want to collaborate? Let's connect and build something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="form-element">
              <h3 className="text-2xl font-semibold mb-6">
                Let's <span className="text-primary">Connect</span>
              </h3>
              <p className="text-muted-foreground mb-8">
                I'm always open to discussing new opportunities, creative ideas, 
                or just having a chat about technology and AI.
              </p>
            </div>

            {/* Contact details */}
            <div className="form-element space-y-4">
              <a href="mailto:ashishboogle810@gmail.com" className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-primary/50 transition-all group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <EnvelopeSimple size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="text-foreground">ashishboogle810@gmail.com</div>
                </div>
              </a>

              <a href="tel:+916205883006" className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-primary/50 transition-all group">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Phone size={24} weight="light" className="text-primary" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <div className="text-foreground">+91 6205883006</div>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div className="social-icons form-element">
              
              <div className="flex gap-4">
                <a href="https://github.com/ashish620-boogle" target="_blank" rel="noopener noreferrer" className="social-icon p-4 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all group">
                  <GithubLogo size={28} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
                <a href="https://www.linkedin.com/in/ashish-kumar-13a605197/" target="_blank" rel="noopener noreferrer" className="social-icon p-4 glass-card rounded-xl hover:bg-primary/10 hover:border-primary/50 transition-all group">
                  <LinkedinLogo size={28} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl space-y-6">
            <div className="form-element">
              <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Name
              </label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="input-glow w-full" placeholder="John Doe" />
            </div>

            <div className="form-element">
              <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                Your Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="input-glow w-full" placeholder="john@example.com" />
            </div>

            <div className="form-element">
              <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                Message
              </label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="input-glow w-full resize-none" placeholder="Tell me about your project..." />
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-btn btn-neon w-full flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? <span>Sending...</span> : submitted ? <span>Message Sent! ✓</span> : <>
                  <span>Send Message</span>
                  <PaperPlaneTilt size={20} weight="light" />
                </>}
            </button>
            {submitError && (
              <p className="text-sm text-destructive">{submitError}</p>
            )}
          </form>
        </div>
      </div>
    </section>;
};
export default Contact;
