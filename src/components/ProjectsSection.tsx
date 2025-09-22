import React, { useEffect, useRef } from 'react';
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
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Wellness Companion',
    description: 'A mindfulness and wellness app featuring stress management tools, meditation breaks, and sleep tracking for better mental health.',
    image: project2,
    tech: ['React Native', 'Firebase', 'HealthKit'],
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'AI & 3D Fashion',
    description: 'Transparent second-hand shopping with AI-powered condition reports and 3D visualization for sustainable fashion choices.',
    image: project3,
    tech: ['React', 'Three.js', 'TensorFlow'],
    liveUrl: '#',
    githubUrl: '#',
  },
];

const ProjectsSection: React.FC = () => {
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
              className="project-card group glass-elevated rounded-2xl overflow-hidden transition-all duration-700 ease-out cursor-pointer hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out" />
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <Button variant="glass" size="icon" className="backdrop-blur-md hover:scale-110 transition-transform duration-200">
                    <ExternalLink size={16} />
                  </Button>
                  <Button variant="glass" size="icon" className="backdrop-blur-md hover:scale-110 transition-transform duration-200">
                    <Github size={16} />
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-all duration-300 ease-out transform group-hover:translate-x-1">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <TechStackIcons techStack={project.tech} />

                {/* Links */}
                <div className="flex space-x-3 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out">
                  <Button variant="glow" size="sm" className="flex-1 hover:scale-105 transition-transform duration-200">
                    <ExternalLink size={14} className="mr-1" />
                    View Live
                  </Button>
                  <Button variant="glass" size="sm" className="hover:scale-105 transition-transform duration-200">
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