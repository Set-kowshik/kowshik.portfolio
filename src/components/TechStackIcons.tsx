import React from 'react';
import { Database, Smartphone, Zap, Globe, Flame, Activity, Box, Brain } from 'lucide-react';

const techIcons: Record<string, React.ComponentType<any>> = {
  'React Native': Smartphone,
  'Node.js': Globe,
  'MongoDB': Database,
  'Firebase': Flame,
  'HealthKit': Activity,
  'React': Zap,
  'Three.js': Box,
  'TensorFlow': Brain,
};

interface TechStackIconsProps {
  techStack: string[];
}

const TechStackIcons: React.FC<TechStackIconsProps> = ({ techStack }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {techStack.map((tech) => {
        const IconComponent = techIcons[tech];
        return (
          <div
            key={tech}
            className="group flex items-center gap-2 px-3 py-1.5 bg-muted/40 border border-muted/60 rounded-full text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
          >
            {IconComponent && (
              <IconComponent size={14} className="transition-all duration-300 group-hover:rotate-12" />
            )}
            <span className="text-xs font-medium transition-all duration-300">{tech}</span>
          </div>
        );
      })}
    </div>
  );
};

export default TechStackIcons;