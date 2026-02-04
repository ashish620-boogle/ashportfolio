import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, GithubLogo, CaretLeft, CaretRight } from '@phosphor-icons/react';

// Import project images
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';
import project4 from '@/assets/project-4.png';
import project5 from '@/assets/project-5.png';
import project6 from '@/assets/project-6.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Advanced RAG Pipeline',
    description: 'End-to-end RAG system with document ingestion, embeddings, and LLM-powered responses.',
    image: project1,
    tags: ['LangChain', 'ChromaDB', 'Groq LLM', 'PyTorch'],
    github: 'https://github.com/ashish620-boogle/Advanced-RAG-pipeline',
    demo: 'https://ash-advanced-rag-pipeline.streamlit.app/'
  },
  {
    id: 2,
    title: 'Digital Twin - Anomaly Detection',
    description: 'Time-series anomaly detection using LSTM features with Random Forest for IoT sensors.',
    image: project2,
    tags: ['TensorFlow', 'LSTM', 'IoT', 'Python'],
    github: 'https://github.com/ashish620-boogle/Sensors-Anomaly-Detection'
  },
  {
    id: 3,
    title: 'MarketPulse',
    description: 'Live BTC forecasting app using gradient-boost models with strategy backtesting.',
    image: project3,
    tags: ['Python', 'Pandas', 'Matplotlib', 'ML'],
    github: 'https://github.com/ashish620-boogle/Time-Series-Analysis',
    demo: 'https://hftsystem.netlify.app/'
  },
  {
    id: 4,
    title: 'Multimodality in VR',
    description: 'TCP client-server communication between haptic device and HMD for real-time interaction.',
    image: project4,
    tags: ['Unity', 'C#', 'TCP', 'Haptics'],
    github: 'https://github.com/ashish620-boogle/Multimodality-in-VR'
  },
  {
    id: 5,
    title: 'VectionSense',
    description: 'Multimodal inertial-physiological cybersickness detection in consumer VR.',
    image: project5,
    tags: ['Transformer', 'VR', 'ML', 'Research'],
    github: 'https://github.com/ashish620-boogle/Vectionsense'
  },
  {
    id: 6,
    title: 'Fake News Detection',
    description: 'Identifying misinformation with machine learning and NLP techniques.',
    image: project6,
    tags: ['TensorFlow', 'NLP', 'Python', 'ML'],
    github: 'https://github.com/ashish620-boogle/Fake_News_Identification'
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

      // Cards stagger animation
      gsap.from('.project-card-wrapper', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sliderRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    const handleScroll = () => {
      const card = slider.children[0] as HTMLElement | undefined;
      if (!card) {
        return;
      }

      const styles = window.getComputedStyle(slider);
      const gapValue = parseFloat(styles.columnGap || styles.gap || '0');
      const cardWidth = card.clientWidth || 1;
      const index = Math.round(slider.scrollLeft / (cardWidth + gapValue));
      setCurrentIndex(Math.max(0, Math.min(projects.length - 1, index)));
    };

    slider.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      slider.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0]?.clientWidth || 400;
      const styles = window.getComputedStyle(sliderRef.current);
      const gap = parseFloat(styles.columnGap || styles.gap || '0') || 24;
      sliderRef.current.scrollTo({
        left: index * (cardWidth + gap),
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = Math.min(projects.length - 1, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  return (
    <section 
      id="projects"
      ref={sectionRef}
      className="section-container relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-[600px] h-[600px] bg-secondary/10 -top-64 left-1/2 transform -translate-x-1/2" />
        <div className="glow-orb w-80 h-80 bg-primary/15 bottom-20 right-0" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my work in AI, machine learning, and immersive technologies.
          </p>
        </div>

        {/* Navigation arrows - Desktop */}
        <div className="hidden md:flex justify-end gap-4 mb-6">
          <button
            onClick={handlePrev}
            className="p-3 glass-card rounded-full hover:bg-primary/20 transition-colors disabled:opacity-50"
            disabled={currentIndex === 0}
          >
            <CaretLeft size={24} weight="light" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 glass-card rounded-full hover:bg-primary/20 transition-colors disabled:opacity-50"
            disabled={currentIndex >= projects.length - 3}
          >
            <CaretRight size={24} weight="light" />
          </button>
        </div>

        {/* Projects slider */}
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card-wrapper flex-shrink-0 w-[340px] md:w-[400px] snap-start"
            >
              <div className="project-card h-full flex flex-col">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      <GithubLogo size={20} weight="light" />
                      View Code
                    </a>
                    {project.demo && (
                      <a 
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors ml-auto"
                      >
                        Live Demo
                        <ArrowRight size={16} weight="light" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile pagination dots */}
        <div className="flex md:hidden justify-center gap-2 mt-6">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
