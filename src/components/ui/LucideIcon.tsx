import * as icons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface LucideIconProps extends LucideProps {
  name: string;
}

export function LucideIcon({ name, ...props }: LucideIconProps) {
  const IconComponent = (icons as any)[name];

  if (!IconComponent) {
    // Fallback to a generic icon
    const Fallback = icons.Box;
    return <Fallback {...props} />;
  }

  return <IconComponent {...props} />;
}
