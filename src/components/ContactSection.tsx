import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Send, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);

const ContactSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo('.contact-title',
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

      // Form animation
      gsap.fromTo('.form-element',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
          }
        }
      );

      // Contact info animation
      gsap.fromTo('.contact-info',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: infoRef.current,
            start: 'top 80%',
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    // Replace with your Google Apps Script Web App URL
    // Instructions: https://developers.google.com/apps-script/guides/web
    const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

    try {
      // Send to Google Sheets
      if (GOOGLE_SHEETS_URL && GOOGLE_SHEETS_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            timestamp: new Date().toISOString(),
          }),
        });
      }

      // Clear form
      setFormData({ name: '', email: '', message: '' });
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // Show success (you can add a toast notification here if needed)
      console.log('Form submitted successfully!');
    } catch (err) {
      console.error('Error submitting form:', err);
      setSubmitError('Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }

    gsap.to('.submit-btn', {
      scale: 1.05,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'g.kowshik00@gmail.com',
      href: 'mailto:g.kowshik00@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9346062068',
      href: 'tel:+919346062068'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Hyderabad, India',
      href: '#'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com',
      color: 'hover:text-white'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://linkedin.com',
      color: 'hover:text-blue-400'
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:g.kowshik00@gmail.com',
      color: 'hover:text-primary'
    }
  ];

  return (
    <section id="contact" ref={containerRef} className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-10" />
      
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="contact-title text-4xl font-bold mb-6">
            Get In{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="contact-title text-muted-foreground text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="form-element">
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="glass border-glass-border/30 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-element">
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="glass border-glass-border/30 focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="form-element">
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="glass border-glass-border/30 focus:border-primary focus:ring-primary/20 transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              {submitError && (
                <p className="text-sm text-destructive" role="alert">{submitError}</p>
              )}

              <Button
                type="submit"
                variant="glow"
                size="lg"
                className="submit-btn w-full group"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={infoRef} className="space-y-8">
            <div className="contact-info">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8">
                I'm always excited to work on new projects and collaborate with creative minds. 
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'd love to hear from you.
              </p>
            </div>

            {/* Contact Details */}
            <div className="contact-info space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center space-x-4 p-4 glass rounded-lg hover:glass-elevated transition-all duration-300 group"
                >
                  <div className="p-3 bg-gradient-primary rounded-lg">
                    <item.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact-info">
              <h4 className="text-lg font-medium mb-4">Follow Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 glass rounded-lg hover:glass-elevated transition-all duration-300 text-muted-foreground ${social.color} group`}
                  >
                    <social.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;