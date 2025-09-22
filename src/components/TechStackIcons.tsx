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
    <div className="flex flex-wrap gap-3 mb-4">
      {techStack.map((tech) => {
        const IconComponent = techIcons[tech];
        return (
          <div
            key={tech}
            className="group relative flex items-center gap-2 px-3 py-2 bg-glass border border-glass-border/30 rounded-full text-primary hover:bg-glass-elevated transition-all duration-300"
          >
            {IconComponent && (
              <IconComponent size={16} className="text-primary group-hover:text-primary-glow transition-colors" />
            )}
            <span className="text-xs font-medium">{tech}</span>
            
            {/* Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-background border border-glass-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
              {tech}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TechStackIcons;