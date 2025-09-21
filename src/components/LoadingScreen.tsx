import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Initial setup
    gsap.set([logoRef.current, percentRef.current], { opacity: 0, y: 30 });
    gsap.set(progressBarRef.current, { width: '0%' });

    // Animation sequence
    tl.to([logoRef.current, percentRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2
    })
    .to(progressBarRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out',
      onUpdate: function() {
        const progress = Math.round(this.progress() * 100);
        if (percentRef.current) {
          percentRef.current.textContent = `${progress}%`;
        }
      }
    })
    .to(logoRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    }, '-=0.5')
    .to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: 'power2.out',
      onComplete: () => {
        onComplete();
      }
    }, '+=0.3');

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-hero"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-primary/20 rounded-full blur-xl floating-orb" />
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/20 rounded-full blur-xl floating-orb" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary-glow/30 rounded-full blur-lg floating-orb" />

      <div className="text-center">
        {/* Logo/Brand */}
        <div ref={logoRef} className="mb-12">
          <h1 className="text-8xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            KΔ
          </h1>
          <p className="text-xl text-muted-foreground tracking-wide">
            KOWSHIK AKULA
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-80 mx-auto">
          <div className="relative">
            <div className="h-1 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                ref={progressBarRef}
                className="h-full bg-gradient-primary shadow-glow-primary transition-all duration-300"
              />
            </div>
            <div className="mt-4 text-center">
              <span ref={percentRef} className="text-sm text-primary font-medium">
                0%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;