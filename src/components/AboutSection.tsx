import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile.png';

// Tech stack icons (using simple text for now - can be replaced with actual icons)
const techStack = [{
  name: 'Figma',
  color: 'text-purple-400'
}, {
  name: 'Framer',
  color: 'text-blue-400'
}, {
  name: 'Photoshop',
  color: 'text-cyan-400'
}, {
  name: 'Illustrator',
  color: 'text-orange-400'
}, {
  name: 'React',
  color: 'text-blue-300'
}, {
  name: 'TypeScript',
  color: 'text-blue-500'
}, {
  name: 'GSAP',
  color: 'text-green-400'
}, {
  name: 'Three.js',
  color: 'text-yellow-400'
}];
gsap.registerPlugin(ScrollTrigger);
const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main content animation
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        x: -100,
        rotationY: -15
      }, {
        opacity: 1,
        x: 0,
        rotationY: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 30%'
        }
      });
      gsap.fromTo(contentRef.current, {
        opacity: 0,
        x: 100
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          end: 'bottom 30%'
        }
      });

      // Tech icons stagger animation
      gsap.fromTo('.tech-icon', {
        opacity: 0,
        y: 50,
        scale: 0.8
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: iconsRef.current,
          start: 'top 80%'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return <section id="about" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
              <div className="glass-elevated rounded-full p-4 relative z-10 group-hover:scale-105 transition-transform duration-500">
                <img src={profileImage} alt="Kowshik Akula" className="w-full h-full object-cover rounded-full" />
              </div>
              {/* Floating ring effect */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                About{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Me
                </span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate UI/UX designer and frontend developer with a keen eye for creating 
                  immersive digital experiences. I specialize in translating complex ideas into 
                  intuitive, beautiful interfaces that users love to interact with.
                </p>
                
                <p>I am Computer Science graduate with a designer’s eye and a problem-solver’s mind. From sketching as a kid to prototyping as a designer, my journey blends the logic of code with the elegance of design. I’m passionate about creating intuitive, human-centered digital experiences.
              </p>
                
                <p>
                  When I'm not designing or coding, you'll find me exploring new creative technologies, 
                  contributing to open-source projects, or sharing knowledge with the design community.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={iconsRef}>
              <h3 className="text-xl font-semibold mb-6 text-foreground">Tech Stack</h3>
              <div className="grid grid-cols-4 gap-4">
                {techStack.map((tech, index) => <div key={tech.name} className="tech-icon glass rounded-lg p-4 text-center hover:glass-elevated transition-all duration-300 group cursor-pointer">
                    
                    <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors mx-0 px-0 my-0 py-0 rounded-lg">
                      {tech.name}
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;