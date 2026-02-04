import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Article, ArrowUpRight, BookOpen } from '@phosphor-icons/react';
gsap.registerPlugin(ScrollTrigger);
const publications = [{
  id: 1,
  title: 'GAttE: Geographic Attention model for Extraction of users\' current locations from social media texts',
  publisher: 'Springer',
  status: 'In Review',
  type: 'Journal Paper',
  description: 'A novel attention-based model GAttE using multi-level embeddings and deconvolutions to extract user locations from social media text, outperforming BERT and others with higher accuracy and lower spatial error.'
}, {
  id: 2,
  title: 'A combined supervised and unsupervised deep learning approach for Intrusion Detection in IoT Traffic in an Edge Computing Environment',
  publisher: 'Springer',
  link: 'https://link.springer.com/article/10.1007/s42979-025-04103-0',
  type: 'Journal Paper',
  description: 'A scalable, efficient IoT intrusion detection novel model for 5G networks achieves 91% accuracy with ~90% reduced space-time complexity using heterogeneous clustering on WUSTL-IIOT and NSL-KDD datasets.'
}, {
  id: 3,
  title: 'Intrusion Detection and Prevention systems in Industrial IoT network',
  publisher: 'Springer',
  link: 'https://link.springer.com/article/10.1007/s12046-024-02567-z',
  type: 'Journal Paper',
  description: 'A novel transformer-boosting intrusion detection model handles highly imbalanced Industrial IoT traffic, reducing false negatives and accurately classifying botnet attacks, including similar DoS and DDoS traffic, on UNSW-IoT-Botnet data.'
}, {
  id: 4,
  title: 'VectionSense: Multimodal Inertial-Physiological Cybersickness Detection in Consumer VR',
  status: 'In Review',
  type: 'Conference Paper',
  description: 'A lightweight multimodal system detects cybersickness in real time by fusing VR headset SLAM motion data with smartwatch heart-rate signals. A compact Transformer achieves high accuracy and low latency, generalises across users, correlates with SSQ scores, and enables practical continuous in-headset monitoring.'
}];
const Publications = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce), (max-width: 768px)', () => {
        return () => {};
      });

      mm.add('(prefers-reduced-motion: no-preference) and (min-width: 769px)', () => {
        // Header animation
        gsap.from(headerRef.current, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });

        // Cards stagger animation
        gsap.from('.publication-card', {
          y: 40,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true
          }
        });

        return () => {};
      });
    });
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);
  return <section id="publications" ref={sectionRef} className="section-container bg-gradient-to-b from-card/30 to-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[500px] h-[500px] bg-secondary/10 -top-64 right-0" />
        <div className="glow-orb w-72 h-72 bg-primary/15 bottom-20 -left-36" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Research <span className="gradient-text">Publications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My contributions to the field of AI, machine learning, and cybersecurity.
          </p>
        </div>

        {/* Publications grid */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          {publications.map(pub => <div key={pub.id} className="publication-card glass-card p-6 hover:border-primary/40 transition-all duration-300 group">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Article size={24} weight="light" />
                </div>
                <div className="flex items-center gap-2">
                  {pub.status ? <span className="px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full border border-accent/30">
                      {pub.status}
                    </span> : <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                      {pub.publisher}
                    </span>}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                {pub.title}
              </h3>

              {/* Type */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <BookOpen size={16} weight="light" />
                {pub.type}
              </div>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {pub.description}
              </p>

              {/* View link / status */}
              <div className="mt-4 pt-4 border-t border-border/50 opacity-100">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors"
                  >
                    View Publication
                    <ArrowUpRight size={16} weight="light" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-sm text-accent">
                    In Review
                  </span>
                )}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default Publications;
