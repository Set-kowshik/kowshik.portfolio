import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating particles animation
      gsap.to('.footer-particle', {
        y: -30,
        x: 'random(-20, 20)',
        duration: 'random(3, 6)',
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: {
          amount: 2,
          from: 'random'
        }
      });

      // Footer content animation
      gsap.fromTo('.footer-content',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer ref={containerRef} className="relative py-16 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-5" />
      
      {/* Floating Particles */}
      <div className="footer-particle absolute top-20 left-10 w-3 h-3 bg-primary/30 rounded-full blur-sm" />
      <div className="footer-particle absolute top-32 right-20 w-2 h-2 bg-accent/40 rounded-full blur-sm" />
      <div className="footer-particle absolute bottom-20 left-1/4 w-4 h-4 bg-primary-glow/20 rounded-full blur-sm" />
      <div className="footer-particle absolute top-16 right-1/3 w-2 h-2 bg-accent/30 rounded-full blur-sm" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="footer-content text-center">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
              KΔ
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Crafting digital experiences that inspire and engage through innovative design and technology.
            </p>
          </div>

          {/* Navigation */}
          <div className="mb-8">
            <nav className="flex flex-wrap justify-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-glass-border/20">
            <p className="text-muted-foreground text-sm">
              © 2024 Kowshik Akula. All rights reserved. Made with ❤️ in Hyderabad.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;