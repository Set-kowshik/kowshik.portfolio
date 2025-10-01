import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail, Sun, Moon } from 'lucide-react';
import { gsap } from 'gsap';
import { useTheme } from 'next-themes';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:g.kowshik00@gmail.com', label: 'Email' },
  ];

  useEffect(() => {
    gsap.fromTo('.nav-item', 
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        delay: 3,
        ease: 'power2.out' 
      }
    );
  }, []);

  const toggleMobile = () => {
    setIsOpen(!isOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="glass rounded-2xl px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div className="nav-item">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                KΔ
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-item text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Social Links & Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-item text-muted-foreground hover:text-primary transition-smooth p-2 rounded-lg hover:bg-glass/50"
                >
                  <Icon size={18} />
                </a>
              ))}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="nav-item text-muted-foreground hover:text-primary transition-smooth p-2 rounded-lg hover:bg-glass/50"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden nav-item"
              onClick={toggleMobile}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-lg" />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen space-y-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={toggleMobile}
                className="text-2xl font-medium text-foreground hover:text-primary transition-smooth"
              >
                {item.name}
              </a>
            ))}
            <div className="flex items-center space-x-6 mt-8">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-smooth p-3 rounded-lg hover:bg-glass/50"
                >
                  <Icon size={24} />
                </a>
              ))}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  className="text-muted-foreground hover:text-primary transition-smooth p-3 rounded-lg hover:bg-glass/50"
                >
                  {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                </Button>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-6 right-6"
              onClick={toggleMobile}
            >
              <X size={24} />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;