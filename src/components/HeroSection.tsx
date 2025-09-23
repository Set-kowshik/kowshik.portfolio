import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { gsap } from 'gsap';
const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      delay: 3.5
    });
    tl.fromTo([headlineRef.current, subtitleRef.current, buttonRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      stagger: 0.2,
      ease: 'power2.out'
    });

    // Floating animation for background orbs
    gsap.to('.hero-orb', {
      y: -20,
      x: 10,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.5
    });
  }, []);
  return <section id="home" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      
      {/* Floating Background Orbs */}
      <div className="hero-orb absolute top-20 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="hero-orb absolute bottom-32 right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl" />
      <div className="hero-orb absolute top-1/2 right-1/4 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl" />
      
      {/* Spline 3D Background */}
      <div className="spline-container absolute inset-0 opacity-60">
        <iframe src='https://my.spline.design/orb-xkEj92wf5F7ywhasKaSzg9DV/' frameBorder='0' width='100%' height='100%' className="w-full h-full pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <h1 ref={headlineRef} className="text-4xl md:text-7xl font-bold mb-6 leading-tight">
          Hi, I'm{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            Kowshik
          </span>
          {' '}–{' '}
          <br className="hidden md:block" />
          <span className="text-foreground/80">UI/UX Designer</span>
        </h1>

        {/* Subtitle */}
        <p ref={subtitleRef} className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
        </p>

        {/* Contact Info */}
        

        {/* Call to Action Buttons */}
        <div ref={buttonRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="hero" size="xl" className="group">
            Hire Me
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <Button 
            variant="glass" 
            size="xl" 
            className="group"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/resume.html';
              link.download = 'Guguloth_kowshik_CV.html';
              link.target = '_blank';
              link.click();
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download CV
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-glass-border/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-primary rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>;
};
export default HeroSection;