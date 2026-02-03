import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Calendar } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    role: 'Software Developer (Real-time Multi-user Systems)',
    company: 'DRDO',
    location: 'Jodhpur, India',
    period: 'June 2025 – Present',
    description: [
      'Developing a real-time, multi-user wargaming simulation in Unity with a focus on networking, state synchronization, and reliability.',
      'Collaborating with stakeholders to translate requirements into deployable features; emphasizing modular design and maintainable code.'
    ],
    tech: ['C#', 'Unity', 'Networking', 'XR Interaction']
  },
  {
    id: 2,
    role: 'AI Intern (Document AI / NLP)',
    company: 'BillOK',
    location: 'Bangalore, India',
    period: 'Oct 2022 – Mar 2023',
    description: [
      'Built an invoice understanding pipeline to extract key fields from both known and unseen invoice templates using a LayoutLM-based model.',
      'Created training/inference workflow and improved robustness across noisy scans through preprocessing and iterative error analysis.'
    ],
    tech: ['PyTorch', 'NLP', 'Transfer Learning', 'Document AI']
  },
  {
    id: 3,
    role: 'ML Intern (Computer Vision)',
    company: 'Kubota Escorts',
    location: 'Remote, India',
    period: 'Sept 2022 – Mar 2023',
    description: [
      'Developed a TensorFlow-based computer vision model to detect unhealthy crops from farm imagery, enabling early identification of issues.'
    ],
    tech: ['TensorFlow', 'Deep Learning', 'Computer Vision']
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      // Timeline items stagger animation
      gsap.from('.experience-card', {
        x: -60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="experience"
      ref={sectionRef}
      className="section-container relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-80 h-80 bg-primary/10 -top-40 -left-40" />
        <div className="glow-orb w-96 h-96 bg-accent/10 bottom-0 right-0" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey in AI, machine learning, and software development.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id}
                className={`experience-card relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 -ml-2 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 z-10" />

                {/* Content */}
                <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}>
                  <div className="glass-card p-6 hover:border-primary/40 transition-all duration-300 group">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-medium mt-1">
                          <Briefcase size={18} weight="light" />
                          {exp.company}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar size={16} weight="light" />
                          {exp.period}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={16} weight="light" />
                          {exp.location}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm leading-relaxed flex gap-2">
                          <span className="text-primary mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
