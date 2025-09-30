import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TechStackIcons from './TechStackIcons';

// Import project images
import project1 from '@/assets/project-1.png';
import project2 from '@/assets/project-2.png';
import project3 from '@/assets/project-3.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Local Community Hub',
    description: 'Connect with your local community through an intuitive mobile platform that helps you find skills, events, and activities near you.',
    image: project1,
    tech: ['React Native', 'Node.js', 'MongoDB'],
    caseStudyId: 'localhub',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Wellness Companion',
    description: 'A mindfulness and wellness app featuring stress management tools, meditation breaks, and sleep tracking for better mental health.',
    image: project2,
    tech: ['React Native', 'Firebase', 'HealthKit'],
    caseStudyId: 'wellness-companion',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'AI & 3D Fashion',
    description: 'Transparent second-hand shopping with AI-powered condition reports and 3D visualization for sustainable fashion choices.',
    image: project3,
    tech: ['React', 'Three.js', 'TensorFlow'],
    caseStudyId: 'veriwear',
    githubUrl: '#',
  },
];

const ProjectsSection: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.projects-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );

      // Project cards stagger animation
      gsap.fromTo('.project-card',
        { opacity: 0, y: 100, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: scrollContainerRef.current,
            start: 'top 80%',
          }
        }
      );

      // Horizontal scroll for mobile
      if (window.innerWidth < 768) {
        gsap.to(scrollContainerRef.current, {
          x: () => -(scrollContainerRef.current!.scrollWidth - window.innerWidth),
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            end: () => `+=${scrollContainerRef.current!.scrollWidth}`,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="projects-title text-4xl font-bold mb-6">
            Featured{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="projects-title text-muted-foreground text-lg max-w-2xl mx-auto">
            A collection of my recent work showcasing modern web technologies and innovative design solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={scrollContainerRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate(`/case-study/${project.caseStudyId}`)}
              className="project-card group glass-elevated rounded-2xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer hover:-translate-y-2 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/25 hover:rotate-[0.5deg]"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 group-hover:brightness-125 group-hover:saturate-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)]" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 translate-y-3 scale-75 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] delay-100">
                  <Button variant="glass" size="icon" className="backdrop-blur-lg border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300">
                    <ExternalLink size={16} className="text-white" />
                  </Button>
                  <Button variant="glass" size="icon" className="backdrop-blur-lg border-white/20 hover:scale-110 hover:bg-white/20 transition-all duration-300">
                    <Github size={16} className="text-white" />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:bg-card/80">
                <h3 className="text-xl font-semibold mb-3 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-primary group-hover:translate-x-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:text-foreground/90 group-hover:translate-x-1">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-x-1">
                  <TechStackIcons techStack={project.tech} />
                </div>

                {/* Links */}
                <div className="flex space-x-3 mt-4 opacity-80 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] delay-150">
                  <Button 
                    variant="glow" 
                    size="sm" 
                    className="flex-1 hover:scale-105 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/case-study/${project.caseStudyId}`);
                    }}
                  >
                    <ExternalLink size={14} className="mr-1" />
                    Case Study
                  </Button>
                  <Button 
                    variant="glass" 
                    size="sm" 
                    className="hover:scale-105 hover:bg-muted/60 transition-all duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;