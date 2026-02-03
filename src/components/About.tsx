import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.png';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: 'C', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
  { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
  { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PyTorch', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'TensorFlow', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
  { name: 'NumPy', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg' },
  { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'Scikit-learn', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg' },
  { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg' },
  { 
    name: 'Seaborn', 
    logo: 'https://seaborn.pydata.org/_static/logo-mark-lightbg.svg',
    fallback: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'
  },
  { name: 'Skimlit', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/streamlit/streamlit-original.svg' },
  { name: 'Flask', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', invert: true },
  { name: 'FastAPI', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg' },
  { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'PostgreSQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Unity', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', invert: true },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade in
      gsap.from(sectionRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Image animation
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Content animation
      gsap.from(contentRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });

      // Skills stagger animation
      const skillItems = document.querySelectorAll('.skill-item');
      if (skillItems.length > 0) {
        gsap.fromTo(skillItems, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: skillsRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about"
      ref={sectionRef}
      className="section-container bg-gradient-to-b from-background to-card/30"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="glow-orb w-96 h-96 bg-primary/10 -top-48 -right-48" />
        <div className="glow-orb w-64 h-64 bg-secondary/15 bottom-0 left-0" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-end">
            <div className="relative group">
              {/* Glowing ring */}
              <div className="absolute inset-[-4px] rounded-full bg-gradient-to-r from-primary via-accent to-secondary opacity-75 blur-sm group-hover:opacity-100 group-hover:blur-md transition-all duration-500" />
              
              {/* Image container */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-background group-hover:scale-105 group-hover:rotate-3 transition-all duration-500">
                <img 
                  src={profileImage} 
                  alt="Ashish Kumar"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 glass-card px-4 py-2 rounded-full">
                <span className="text-sm font-medium text-primary">IIT Jodhpur</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-semibold">
              GenAI Engineer & <span className="text-primary">Data Scientist</span>
            </h3>
            
            <p className="text-muted-foreground leading-relaxed">
              Data Science and GenAI-focused engineer with hands-on experience across NLP, 
              time-series/anomaly detection, and end-to-end Retrieval Augmented Generation (RAG) systems.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Strong Python/ML foundations with publications in applied ML/security and NLP. 
              Currently pursuing M.Tech in AR&VR at IIT Jodhpur and building real-time 
              multi-user systems at DRDO.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">4</div>
                <div className="text-sm text-muted-foreground">Publications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">1+</div>
                <div className="text-sm text-muted-foreground">Years Exp</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div ref={skillsRef} className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-10">
            Technical <span className="gradient-text">Skills</span>
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {skills.map((skill) => (
              <div 
                key={skill.name}
                className="skill-item skill-icon flex flex-col items-center gap-3 group"
              >
                <img
                  src={skill.logo}
                  alt={`${skill.name} logo`}
                  loading="lazy"
                  className={`h-10 w-10 object-contain transition-transform duration-300 group-hover:scale-110 ${
                    skill.invert ? 'invert' : ''
                  }`}
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (!skill.fallback || img.dataset.fallbackApplied === 'true') {
                      return;
                    }
                    img.dataset.fallbackApplied = 'true';
                    img.src = skill.fallback;
                    if (skill.fallbackInvert === false) {
                      img.classList.remove('invert');
                    } else if (skill.fallbackInvert === true) {
                      img.classList.add('invert');
                    }
                  }}
                />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
