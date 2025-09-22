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
  'TensorFlow': Brain
};
interface TechStackIconsProps {
  techStack: string[];
}
const TechStackIcons: React.FC<TechStackIconsProps> = ({
  techStack
}) => {
  return <div className="flex flex-wrap gap-3 mb-4">
      {techStack.map(tech => {
      const IconComponent = techIcons[tech];
      return;
    })}
    </div>;
};
export default TechStackIcons;